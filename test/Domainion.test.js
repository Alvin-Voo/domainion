const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');//this will return a constructor function

const provider = ganache.provider();//this is the provider to the network
const web3 = new Web3(provider);//can make multiple instances

const compiledDomainion = require('../ethereum/build/Domainion');

let accounts;
const testdomains = ['www.1.com','www.2.com','www.3.com','www.4.com','www.5.com'];

beforeEach(async()=>{
  accounts = await web3.eth.getAccounts();

  domainion = await new web3.eth.Contract(JSON.parse(compiledDomainion.interface))
  .deploy({data: compiledDomainion.bytecode})
  .send({from: accounts[0], gas: '2000000'});

  //before each test case, create 3 players at least
  await domainion.methods.createPlayer().send({
    from: accounts[0],
    gas: '1000000'
  });

  await domainion.methods.createPlayer().send({
    from: accounts[1],
    gas: '1000000'
  });

  await domainion.methods.createPlayer().send({
    from: accounts[2],
    gas: '1000000'
  });
})

describe('Basic public/external function test', ()=>{

  it('created 3 players with valid minionCount',async ()=>{
    let result = await domainion.methods.players(0).call();
    assert.strictEqual(result.minionCount,'1000');
    result = await domainion.methods.players(1).call();
    assert.strictEqual(result.minionCount,'1000');
    result = await domainion.methods.players(2).call();
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

    const retDomains = await domainion.methods.getDomainsByPlayer(accounts[0]).call();
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
      assert.strictEqual(retVal.player,accounts[0]);
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

    let player = await domainion.methods.getPlayerByDomain(testdomains[0]).call()
    assert.strictEqual(player,accounts[0]);
    player = await domainion.methods.getPlayerByDomain(testdomains[1]).call()
    assert.strictEqual(player,accounts[0]);
  });

  it('returns a nice 0x0000000000000000000000000000000000000000 for unoccupied domain', async()=>{
    let player = await domainion.methods.getPlayerByDomain(testdomains[0]).call()
    assert.strictEqual(player,'0x0000000000000000000000000000000000000000');
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
