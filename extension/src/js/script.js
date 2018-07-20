//console logs to web page
import Web3 from 'web3';

console.log(window.web3);


if(typeof window.web3 !== 'undefined'){

  web3 = new Web3(window.web3.currentProvider);
  console.log(web3);
  document.addEventListener('CREATE_PLAYER', async(e) => {
    console.log('script: CREATE_PLAYER');
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
  });
}
