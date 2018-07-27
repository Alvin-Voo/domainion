import 'img/icon-128.png'
import 'img/icon-34.png'

console.log('background on');

const onMessageListener = function(message, sender, sendResponse) {
  console.log("background script listener: " + message.type);
    switch(message.type) {
        case "bglog":
            console.log(message.obj);
        break;
    }
    return true;
}
chrome.runtime.onMessage.addListener(onMessageListener);

//only source of truth.. the background
