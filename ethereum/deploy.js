const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledDomainion = require('../ethereum/build/GamePlay');
const {mnemonic} = require('../config/config');
const provider = new HDWalletProvider(
  mnemonic,
  'https://rinkeby.infura.io/zrgEHIcGzfZ3LHNoemSE'
);
const web3 = new Web3(provider);
const deploy = async()=>{

  try{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from ',accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledDomainion.interface))
      .deploy({data:compiledDomainion.bytecode})
      .send({from:accounts[0],gas:2000000});

    console.log('Contract deployed to ',result.options.address);

  }catch(e){
    console.log('Error: ',e.message);
  }

};

deploy();
