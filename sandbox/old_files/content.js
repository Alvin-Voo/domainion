import {parseHostname} from 'js/common/utils';

//here console logs to web page - content script init once per webpage?
console.log('content script init!!');

function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute("id","domainion");
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
};

// popup.js (chrome extension) ---> content.js - listener
// content.js ---> script.js (DOM) - dispatcher
const onMessageListener = function(message, sender, sendResponse) {
    console.log("content script listener: "+message.type);
    switch(message.type) {
        case "create_player":
          console.log("create player");
          document.dispatchEvent(new CustomEvent('CREATE_PLAYER'));
        break;
        case "attack_domain":
          const hostname = parseHostname(message.url);
          console.log("attacking domain "+hostname);
          document.dispatchEvent(new CustomEvent('ATTACK_DOMAIN',{detail: hostname}));
        break;
        case "init":
          console.log("popup init");
          document.dispatchEvent(new CustomEvent('INIT'))
        break;
    }
    return true;
}

chrome.runtime.onMessage.addListener(onMessageListener);

// script.js (DOM) ---> content.js - listener
// content.js ---> popup.js (chrome extension) - dispatcher
document.addEventListener('WEB3_ACCOUNT_PAGE_INFO',(e)=>{
  if(chrome && chrome.runtime) {
    chrome.runtime.sendMessage({type: "account_page_info", obj: e.detail});//--> this sends to both background and popup (ie. whoever is listening to the runtime)
  }
})

//

injectScript(chrome.extension.getURL('script.bundle.js'), 'body');
