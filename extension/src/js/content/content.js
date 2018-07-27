import {Store} from 'react-chrome-redux';
import * as types from 'js/background/actions/types';
import {store_web3_account_page_info, resetStore} from 'js/background/actions';

//here console logs to web page - content script init once per webpage?
//content script here is mainly a middle man
console.log('content script init!!');

//ALL communication between content and popup is now settled through redux store
const proxyStore = new Store({portName: 'WORLD_DOMAINATION'});

proxyStore.subscribe(()=>{
  console.log('content triggered!');
  console.log(proxyStore.getState().store);
  let {popup_command,popup_payload} = proxyStore.getState().store;
  if(!popup_command) return;
  switch(popup_command){
    case types.INIT:
      console.log('content:init');
      document.dispatchEvent(new CustomEvent('INIT'));
    break;
    case types.JOIN:
      console.log('content:join');
      document.dispatchEvent(new CustomEvent('CREATE_PLAYER'));
    break;
    case types.ATTACK:
      console.log('content:attack');
      if(!popup_payload) return console.log('content: hey..hostname is empty!');
      document.dispatchEvent(new CustomEvent('ATTACK_DOMAIN',{detail: popup_payload}));
    break;
  }
  //once consumed the event, reset the state such that command is executed once per consumption
  if(popup_command) proxyStore.dispatch(resetStore());
})

function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute("id","domainion");
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
};

// script.js (DOM) ---> content.js - listener
// content.js ---> popup.js (chrome extension) --- via proxyStore
document.addEventListener('WEB3_ACCOUNT_PAGE_INFO',(e)=>{
  console.log('dispatching content ');
  console.log(e.detail);
  proxyStore.dispatch(store_web3_account_page_info(e.detail));
})


injectScript(chrome.extension.getURL('script.bundle.js'), 'body');
