require('./messaging/eventListener');
require('./messaging/messageListener');
//here console logs to web page - content script init once per webpage?
//content script here is mainly a middle man
console.log('content script init!!');

function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
    script.remove();
};

injectScript(chrome.extension.getURL('script.bundle.js'), 'body');
