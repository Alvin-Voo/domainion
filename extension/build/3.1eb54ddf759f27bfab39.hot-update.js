webpackHotUpdate(3,{295:function(module,exports){eval("//here console logs to web page\nconsole.log('this is content script yay!!');\n\nfunction injectScript(file_path, tag) {\n    var node = document.getElementsByTagName(tag)[0];\n    var script = document.createElement('script');\n    script.setAttribute('type', 'text/javascript');\n    script.setAttribute('src', file_path);\n    node.appendChild(script);\n};\n\nconst onMessageListener = function(message, sender, sendResponse) {\n    switch(message.type) {\n        case \"create_player\":\n          console.log(\"create player\");\n          document.dispatchEvent(new CustomEvent('CREATE_PLAYER', {create_player:true}));\n        break;\n    }\n    return true;\n}\n\nchrome.runtime.onMessage.addListener(onMessageListener);\ninjectScript(chrome.extension.getURL('script.bundle.js'), 'body');\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjk1LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZXh0ZW5zaW9uL3NyYy9qcy9jb250ZW50LmpzPzU1NjgiXSwic291cmNlc0NvbnRlbnQiOlsiLy9oZXJlIGNvbnNvbGUgbG9ncyB0byB3ZWIgcGFnZVxuY29uc29sZS5sb2coJ3RoaXMgaXMgY29udGVudCBzY3JpcHQgeWF5ISEnKTtcblxuZnVuY3Rpb24gaW5qZWN0U2NyaXB0KGZpbGVfcGF0aCwgdGFnKSB7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpWzBdO1xuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGZpbGVfcGF0aCk7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTtcblxuY29uc3Qgb25NZXNzYWdlTGlzdGVuZXIgPSBmdW5jdGlvbihtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHN3aXRjaChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcImNyZWF0ZV9wbGF5ZXJcIjpcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZSBwbGF5ZXJcIik7XG4gICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ0NSRUFURV9QTEFZRVInLCB7Y3JlYXRlX3BsYXllcjp0cnVlfSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihvbk1lc3NhZ2VMaXN0ZW5lcik7XG5pbmplY3RTY3JpcHQoY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ3NjcmlwdC5idW5kbGUuanMnKSwgJ2JvZHknKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///295\n")}});