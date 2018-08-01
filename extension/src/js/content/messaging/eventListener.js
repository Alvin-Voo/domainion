import {Store} from 'react-chrome-redux';
import {store_web3_account_page_info,
  join_success,join_fail,
  attack_success,attack_fail} from 'js/background/actions';
const proxyStore = new Store({portName: 'WORLD_DOMAINATION'});

// script.js (DOM) ---> content.js - listener
// content.js ---> popup.js (chrome extension) --- via proxyStore
document.addEventListener('WEB3_ACCOUNT_PAGE_INFO',(e)=>{
  // console.log('dispatching web3 account ');
  // console.log(e.detail);
  proxyStore.dispatch(store_web3_account_page_info(e.detail));
});

document.addEventListener('WEB3_PLAYER_CREATED',(e)=>{
  // console.log('dispatching player created ');
  // console.log(e.detail);
  proxyStore.dispatch(join_success(e.detail));
  //if successful, reinit again
  document.dispatchEvent(new CustomEvent('INIT'))
});

document.addEventListener('WEB3_PLAYER_NOT_CREATED',(e)=>{
  // console.log('dispatching player NOT created ');
  // console.log(e.detail);
  proxyStore.dispatch(join_fail(e.detail))
});

document.addEventListener('WEB3_ATTACK_SUCCESS',(e)=>{
  console.log('dispatching web3 attack success');
  console.log(e.detail);
  proxyStore.dispatch(attack_success(e.detail));
  //if successful, reinit again
  document.dispatchEvent(new CustomEvent('INIT'))
});

document.addEventListener('WEB3_ATTACK_FAIL',(e)=>{
  console.log('dispatching web3 attack fail');
  console.log(e.detail);
  proxyStore.dispatch(attack_fail(e.detail));
});
