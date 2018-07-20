import web3 from './web3';
import Domainion from './build/Domainion.json';
//deployed address in Rinkeby Testnet
const address = '0x3a9C8A5EC9117bb2967003C7e192C73C946D67e7';

const instance = new web3.eth.Contract(
  JSON.parse(Domainion.interface),
  address
);

export default instance;
