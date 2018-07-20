import '../img/icon-128.png'
import '../img/icon-34.png'

const onMessageListener = function(message, sender, sendResponse) {
    switch(message.type) {
        case "bglog":
            console.log(message.obj);
        break;
    }
    return true;
}
chrome.runtime.onMessage.addListener(onMessageListener);
