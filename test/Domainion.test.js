const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');//this will return a constructor function

const provider = ganache.provider();//this is the provider to the network
const web3 = new Web3(provider);//can make multiple instances

const compiledDomainion = require('../ethereum/build/GamePlay');

let accounts;
const testdomains = ['www.1.com','www.2.com','www.3.com','www.4.com','www.5.com'];

beforeEach(async()=>{
  accounts = await web3.eth.getAccounts();

  domainion = await new web3.eth.Contract(JSON.parse(compiledDomainion.interface))
  .deploy({data: compiledDomainion.bytecode})
  .send({from: accounts[0], gas: '3000000'});

  //before each test case, create 3 players at least
  await domainion.methods.createPlayer().send({
    from: accounts[0],
    gas: '2000000'
  });

  await domainion.methods.createPlayer().send({
    from: accounts[1],
    gas: '2000000'
  });

  await domainion.methods.createPlayer().send({
    from: accounts[2],
    gas: '2000000'
  });
})

describe('Basic public/external function test', function(){
  it('created 3 players with valid address & minionCount',async ()=>{
    let result = await domainion.methods.players(0).call();
    assert.strictEqual(result.playerAddress,accounts[0]);
    assert.strictEqual(result.minionCount,'1000');
    result = await domainion.methods.players(1).call();
    assert.strictEqual(result.playerAddress,accounts[1]);
    assert.strictEqual(result.minionCount,'1000');
    result = await domainion.methods.players(2).call();
    assert.strictEqual(result.playerAddress,accounts[2]);
    assert.strictEqual(result.minionCount,'1000');
  });

  it('players could attack new domain(s)',async()=>{

    await domainion.methods.attackDomain(testdomains[0]).send({
      from:accounts[0],
      gas:'1000000'
    });

    await domainion.methods.attackDomain(testdomains[1]).send({
      from:accounts[0],
      gas:'1000000'
    });

    const retDomains = await domainion.methods.getMyDomains().call({
      from:accounts[0]
    });

    assert.strictEqual(retDomains[0],'1');
    assert.strictEqual(retDomains[1],'2');

    let result = await domainion.methods.domains(parseInt(retDomains[0])-1).call();
    assert.strictEqual(result.url,testdomains[0]);
    result = await domainion.methods.domains(parseInt(retDomains[1])-1).call();
    assert.strictEqual(result.url,testdomains[1]);
  });

  it('the NewCapturedDomain event fires after domain is attacked', async()=>{
    domainion.events.NewCapturedDomain((err, event)=>{
      if(err) assert(false);
      const retVal = event.returnValues;
      assert.strictEqual(retVal.domainId,'1');
      assert.strictEqual(retVal.url,testdomains[0]);
      assert.strictEqual(retVal.playerAddress,accounts[0]);
    });

    await domainion.methods.attackDomain(testdomains[0]).send({
      from:accounts[0],
      gas:'1000000'
    });
  });

  it('returns the rightful player to an occupied domain', async()=>{
    await domainion.methods.attackDomain(testdomains[0]).send({
      from:accounts[0],
      gas:'1000000'
    });
    await domainion.methods.attackDomain(testdomains[1]).send({
      from:accounts[0],
      gas:'1000000'
    });

    let info = await domainion.methods.getDomainInfo(testdomains[0]).call()
    assert.strictEqual(info.playerAddress,accounts[0]);
    info = await domainion.methods.getDomainInfo(testdomains[1]).call()
    assert.strictEqual(info.playerAddress,accounts[0]);
  });

  it('reverts when domain does not exist', async()=>{
    try{
        let info = await domainion.methods.getDomainInfo(testdomains[0]).call()
        assert(false);
    }catch(e){
      assert(true);
    }
  })

  it('reverts transaction for unoccupied domain', async()=>{
    try{
      let info = await domainion.methods.getDomainInfo(testdomains[0]).call()
      assert(false);
    }catch(e){
      assert(true);
    }
  });

  it('returns correct info for player', async()=>{
    await domainion.methods.attackDomain(testdomains[0]).send({
      from:accounts[0],
      gas:'1000000'
    });

    const player1 = await domainion.methods.getMyInfo().call({
      from:accounts[0]
    });

    assert.strictEqual(player1.domainCount,'1');

    const player2 = await domainion.methods.getMyInfo().call({
      from:accounts[1]
    });

    assert.strictEqual(player2.domainCount,'0');
  });

  it('correctly blocks attack on an occupied domain before cooldown period is over',async()=>{
    await domainion.methods.attackDomain(testdomains[0]).send({
      from:accounts[0],
      gas:'1000000'
    });

    try{
      await domainion.methods.attackDomain(testdomains[0]).send({
        from:accounts[1],
        gas:'1000000'
      });
      assert(false);
    }catch(e){
      assert(true);
    }
  });

});

describe('Test cooldown period of attack (Pls wait for around 20secs)', function() {
  this.timeout(21500);

  it('unblocks an attack on an occupied domain after cooldown period is over', async()=>{
    await domainion.methods.attackDomain(testdomains[0]).send({
      from:accounts[0],
      gas:'1000000'
    });

    await new Promise(resolve => setTimeout(resolve, 20200));

    try{
      await domainion.methods.attackDomain(testdomains[0]).send({
        from:accounts[1],
        gas:'1000000'
      });
      assert(true);
    }catch(e){
      assert(false);
    }
  });
})

describe('Admin functions', function(){
  it('removes a player and all the player\'s info and domains will be resetted', async()=>{
    await domainion.methods.attackDomain(testdomains[0]).send({
      from:accounts[1],
      gas:'1000000'
    });
    await domainion.methods.attackDomain(testdomains[1]).send({
      from:accounts[1],
      gas:'1000000'
    });

    await domainion.methods.removePlayer(accounts[1]).send({
      from:accounts[0],
      gas:'1000000'
    });

    const {playerAddress,minionCount,domainCount} = await domainion.methods.players(1).call();
    assert.strictEqual(parseInt(playerAddress),0);
    assert.strictEqual(minionCount,'0');
    assert.strictEqual(domainCount,'0');

    const info1 = await domainion.methods.getDomainInfo(testdomains[0]).call();
    assert.strictEqual(parseInt(info1.playerAddress),0);
    const info2 = await domainion.methods.getDomainInfo(testdomains[1]).call();
    assert.strictEqual(parseInt(info2.playerAddress),0);
  });

  it('removes a player and the said player can still re-join afterwards', async()=>{
    await domainion.methods.removePlayer(accounts[1]).send({
      from:accounts[0],
      gas:'1000000'
    });

    await domainion.methods.createPlayer().send({
      from: accounts[1],
      gas: '1000000'
    });

    const {playerAddress,minionCount,domainCount} = await domainion.methods.players(3).call();
    assert.strictEqual(playerAddress,accounts[1]);
    assert.strictEqual(minionCount,'1000');
  });

  it('bans a player and the player will be in banned list. All the player\'s info and domains will also be resetted', async()=>{
    await domainion.methods.attackDomain(testdomains[0]).send({
      from:accounts[1],
      gas:'1000000'
    });
    await domainion.methods.attackDomain(testdomains[1]).send({
      from:accounts[1],
      gas:'1000000'
    });

    await domainion.methods.banPlayer(accounts[1],'cheating').send({
      from:accounts[0],
      gas:'1000000'
    });

    const bannedList = await domainion.methods.getBannedPlayersList().call();
    assert.strictEqual(bannedList[0],accounts[1]);

    const {playerAddress,minionCount,domainCount} = await domainion.methods.players(1).call();
    assert.strictEqual(parseInt(playerAddress),0);
    assert.strictEqual(minionCount,'0');
    assert.strictEqual(domainCount,'0');

    const info1 = await domainion.methods.getDomainInfo(testdomains[0]).call();
    assert.strictEqual(parseInt(info1.playerAddress),0);
    const info2 = await domainion.methods.getDomainInfo(testdomains[1]).call();
    assert.strictEqual(parseInt(info2.playerAddress),0);
  });

  it('bans a player and the said player can never re-join anymore', async()=>{
    await domainion.methods.banPlayer(accounts[1],'cheating').send({
      from:accounts[0],
      gas:'1000000'
    });

    try{
      await domainion.methods.createPlayer().send({
        from: accounts[1],
        gas: '1000000'
      });
      assert(false);
    }catch(e){
      const bannedList = await domainion.methods.getBannedPlayersList().call();
      assert.strictEqual(bannedList[0],accounts[1]);
    }
  })
})
