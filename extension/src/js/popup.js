import "../css/popup.css";
//need to send logs to background.js
import {bglog} from "./common/utils";

let join_button = document.getElementById("join");
let attack_button = document.getElementById("attack");
let info = document.getElementById("info");
let info2 = document.getElementById("info2");

bglog('popup called');//here only executes once the extension is click

//common functions
function init(){
  // chrome.storage.sync.get(['can_attack'], (ret)=>{
  //   bglog(ret);
  //   if(ret.can_attack===undefined) {
  //     attack_button.disabled = false;
  //   }
  //   else attack_button.disabled = !ret.can_attack;
  // });

  sendMsgToTab({type: "init"});
}

//send message function to tab's script.js
function sendMsgToTab(msg){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    bglog('sending message '+msg.type);
    chrome.tabs.sendMessage(tabs[0].id, msg);
  });
}

join_button.onclick =(element)=>{
  sendMsgToTab({type: "create_player"});
  element.setAttribute('disabled',true);
}

attack_button.onclick =(element)=>{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    bglog('attack '+tabs[0].url);
    chrome.tabs.sendMessage(tabs[0].id, {type: "attack_domain",url: tabs[0].url});
  });
  // chrome.storage.sync.set({'can_attack':false});
}

//runtime listener
//from content.js --> popup
const onMessageListener = function(message, sender, sendResponse) {
  bglog("popuplistener: "+message.type);
  switch(message.type) {
      case "account_page_info":
        const {account, exists, domainowner} = message.obj;
        bglog(`account from script: ${account}`);
        if(!account){
          info.innerHTML="Please login to your MetaMask."
        }
        else {
          if(exists){
            info.innerHTML=`Welcome back! ${account}`
            info2.innerHTML=`${domainowner}`;
            join_button.setAttribute('disabled',true);
          }
        }
      break;
    };
    return true;
}

chrome.runtime.onMessage.addListener(onMessageListener);

init();
