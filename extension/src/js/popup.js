import "../css/popup.css";
//need to send logs to background.js
import {bglog} from "./common/utils";
// import hello from "./popup/example";
import web3 from "../../../ethereum/web3";

let join_button = document.getElementById("join");

join_button.onclick = async(element)=>{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    bglog('bglog working ??' + tabs[0].id);
    chrome.tabs.sendMessage(tabs[0].id, {type: "create_player", obj: 'greetings 22'});
  });
}

// join_button.addEventListener("click", async(event)=>{
//   alert("some text");
//   bglog('something');
//   try{
//
//     const accounts = await web3.eth.getAccounts();
//     bglog(accounts);
//   }catch(e){
//     bglog(e);
//   }
// }, false);
