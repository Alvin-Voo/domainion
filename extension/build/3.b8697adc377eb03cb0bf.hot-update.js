webpackHotUpdate(3,{295:function(module,exports){eval("//here console logs to web page\nconsole.log('this is content script yay!!');\n\nfunction injectScript(file_path, tag) {\n    var node = document.getElementsByTagName(tag)[0];\n    var script = document.createElement('script');\n    script.setAttribute('type', 'text/javascript');\n    script.setAttribute('src', file_path);\n    node.appendChild(script);\n\n\n  //   document.addEventListener('GET_PROVIDER', function(e) {\n  //     console.log(e.detail);\n  // });\n};\n\nconst onMessageListener = function(message, sender, sendResponse) {\n    switch(message.type) {\n        case \"create_player\":\n          console.log(\"create player\");\n\n        break;\n    }\n    return true;\n}\n\nchrome.runtime.onMessage.addListener(onMessageListener);\ninjectScript(chrome.extension.getURL('script.bundle.js'), 'body');\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjk1LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZXh0ZW5zaW9uL3NyYy9qcy9jb250ZW50LmpzPzU1NjgiXSwic291cmNlc0NvbnRlbnQiOlsiLy9oZXJlIGNvbnNvbGUgbG9ncyB0byB3ZWIgcGFnZVxuY29uc29sZS5sb2coJ3RoaXMgaXMgY29udGVudCBzY3JpcHQgeWF5ISEnKTtcblxuZnVuY3Rpb24gaW5qZWN0U2NyaXB0KGZpbGVfcGF0aCwgdGFnKSB7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpWzBdO1xuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGZpbGVfcGF0aCk7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG5cbiAgLy8gICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdHRVRfUFJPVklERVInLCBmdW5jdGlvbihlKSB7XG4gIC8vICAgICBjb25zb2xlLmxvZyhlLmRldGFpbCk7XG4gIC8vIH0pO1xufTtcblxuY29uc3Qgb25NZXNzYWdlTGlzdGVuZXIgPSBmdW5jdGlvbihtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHN3aXRjaChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcImNyZWF0ZV9wbGF5ZXJcIjpcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZSBwbGF5ZXJcIik7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIob25NZXNzYWdlTGlzdGVuZXIpO1xuaW5qZWN0U2NyaXB0KGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdzY3JpcHQuYnVuZGxlLmpzJyksICdib2R5Jyk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///295\n")}});