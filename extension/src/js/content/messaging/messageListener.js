import * as types from 'js/background/actions/types';
// popup.js (chrome extension) ---> content.js - listener
// content.js ---> script.js (DOM) - dispatcher
const onMessageListener = function(message, sender, sendResponse) {
    console.log("content script listener: "+message.type);
    switch(message.type) {
        case types.JOIN:
          console.log("create player");
          document.dispatchEvent(new CustomEvent('CREATE_PLAYER'));
        break;
        case types.ATTACK:
          if(!message.hostname) return console.log('attack hostname is empty!');
          document.dispatchEvent(new CustomEvent('ATTACK_DOMAIN',{detail: message.hostname}));
        break;
        case types.INIT:
          console.log("popup init");
          document.dispatchEvent(new CustomEvent('INIT'))
        break;
    }
    return true;
}

chrome.runtime.onMessage.addListener(onMessageListener);
