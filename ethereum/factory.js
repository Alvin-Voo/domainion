import web3 from './web3';
import Domainion from './build/GamePlay';
//deployed address in Rinkeby Testnet
const address = '0x0BD7AeF78D112123Bde12E158FDB1DBF0cab004A';

const instance = new web3.eth.Contract(
  JSON.parse(Domainion.interface),
  address
);

export default instance;
