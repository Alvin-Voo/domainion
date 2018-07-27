const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');//this will return a constructor function

const provider = ganache.provider();//this is the provider to the network
const web3 = new Web3(provider);//can make multiple instances

const compiledDomainion = require('../ethereum/build/GamePlay');
let accounts;
const testdomains = ['www.1.com','www.2.com','www.3.com','www.4.com','www.5.com'];

async function main(){
  try{
    accounts = await web3.eth.getAccounts();

    const domainion = await new web3.eth.Contract(JSON.parse(compiledDomainion.interface))
    .deploy({data: compiledDomainion.bytecode})
    .send({from: accounts[0], gas: '2000000'});

    domainion.events.NewCreatedPlayer((err,event)=>{
      const retVal = event.returnValues;
      console.log('player created!');
      console.log(retVal);
    });

    domainion.events.NewCapturedDomain((err,event)=>{
      const retVal = event.returnValues;
      console.log('attack successful!');
      console.log(retVal.url);
    });

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

    let totalPlayers = await domainion.methods.getTotalPlayersCount().call();

    console.log(totalPlayers);

    let playersAddrs = await domainion.methods.getTotalPlayersAddress().call();

    console.log(playersAddrs);

    await domainion.methods.removePlayer(accounts[1]).send({
      from: accounts[0],
      gas: '1000000'
    })

    playersAddrs = await domainion.methods.getTotalPlayersAddress().call();

    console.log(playersAddrs);

    console.log('before attack');
    await domainion.methods.attackDomain(testdomains[0]).send({
      from:accounts[0],
      gas:'1000000'
    });


    // await domainion.methods.attackDomain(testdomains[1]).send({
    //   from:accounts[0],
    //   gas:'1000000'
    // });

    console.log('after attack');

    const domains = await domainion.methods.getMyDomains().call({
      from:accounts[0]
    })

    console.log(domains);

  }catch(e){
    console.log(e);
  }
}


main();
