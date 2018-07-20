//here console logs to web page
console.log('this is content script yay!!');

function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute("id","domainion");
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
};

const onMessageListener = function(message, sender, sendResponse) {
    switch(message.type) {
        case "create_player":
          console.log("create player");
          document.dispatchEvent(new CustomEvent('CREATE_PLAYER', {create_player:true}));
        break;
    }
    return true;
}

chrome.runtime.onMessage.addListener(onMessageListener);
injectScript(chrome.extension.getURL('script.bundle.js'), 'body');
