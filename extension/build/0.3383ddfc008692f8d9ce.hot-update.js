webpackHotUpdate(0,{297:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: ./extension/src/css/popup.css\nvar popup = __webpack_require__(131);\n\n// CONCATENATED MODULE: ./extension/src/js/common/utils.js\nfunction bglog(obj) {\n\tif(chrome && chrome.runtime) {\n\t\tchrome.runtime.sendMessage({type: \"bglog\", obj: obj});\n\t}\n}\n\n\n\n// EXTERNAL MODULE: ./node_modules/web3/src/index.js\nvar src = __webpack_require__(59);\nvar src_default = /*#__PURE__*/__webpack_require__.n(src);\n\n// CONCATENATED MODULE: ./ethereum/web3.js\n\n\nlet web3;\n\nif (typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){\n  //We are in the browser and metamask is running\n  web3 = new src_default.a(window.web3.currentProvider);//assigning Metamask web3 instance's provider to this web3\n}else{\n  //We are on the server *OR* the user is not running metamask\n  // const provider = new Web3.providers.HttpProvider(\n  //   'https://rinkeby.infura.io/zrgEHIcGzfZ3LHNoemSE'\n  // );\n\n  const provider = new src_default.a.providers.WebsocketProvider(\n    'wss://rinkeby.infura.io/ws'\n  );\n  //if using infura as web3 provider, only good to READ from blockchain\n  //in order to WRITE to blockchain, means need to sign transactions with\n  //public/private key pair, this requires a Metamask web3 provider (which contains the individual user's account)\n\n  web3 = new src_default.a(provider);\n}\n\n/* harmony default export */ var ethereum_web3 = (web3);\n\n// CONCATENATED MODULE: ./extension/src/js/popup.js\n\n//need to send logs to background.js\n\n// import hello from \"./popup/example\";\n\n\nlet join_button = document.getElementById(\"join\");\n\njoin_button.onclick = async(element)=>{\n  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {\n    bglog('bglog working ??' + tabs[0].id);\n    chrome.tabs.sendMessage(tabs[0].id, {type: \"create_player\", obj: 'greetings 22'});\n  });\n}\n\n// join_button.addEventListener(\"click\", async(event)=>{\n//   alert(\"some text\");\n//   bglog('something');\n//   try{\n//\n//     const accounts = await web3.eth.getAccounts();\n//     bglog(accounts);\n//   }catch(e){\n//     bglog(e);\n//   }\n// }, false);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjk3LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZXh0ZW5zaW9uL3NyYy9qcy9jb21tb24vdXRpbHMuanM/MWYwOSIsIndlYnBhY2s6Ly8vLi9ldGhlcmV1bS93ZWIzLmpzP2ExOTAiLCJ3ZWJwYWNrOi8vLy4vZXh0ZW5zaW9uL3NyYy9qcy9wb3B1cC5qcz82M2NjIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGJnbG9nKG9iaikge1xuXHRpZihjaHJvbWUgJiYgY2hyb21lLnJ1bnRpbWUpIHtcblx0XHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7dHlwZTogXCJiZ2xvZ1wiLCBvYmo6IG9ian0pO1xuXHR9XG59XG5cbmV4cG9ydCB7Ymdsb2d9O1xuIiwiaW1wb3J0IFdlYjMgZnJvbSAnd2ViMyc7XG5cbmxldCB3ZWIzO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy53ZWIzICE9PSAndW5kZWZpbmVkJyl7XG4gIC8vV2UgYXJlIGluIHRoZSBicm93c2VyIGFuZCBtZXRhbWFzayBpcyBydW5uaW5nXG4gIHdlYjMgPSBuZXcgV2ViMyh3aW5kb3cud2ViMy5jdXJyZW50UHJvdmlkZXIpOy8vYXNzaWduaW5nIE1ldGFtYXNrIHdlYjMgaW5zdGFuY2UncyBwcm92aWRlciB0byB0aGlzIHdlYjNcbn1lbHNle1xuICAvL1dlIGFyZSBvbiB0aGUgc2VydmVyICpPUiogdGhlIHVzZXIgaXMgbm90IHJ1bm5pbmcgbWV0YW1hc2tcbiAgLy8gY29uc3QgcHJvdmlkZXIgPSBuZXcgV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyKFxuICAvLyAgICdodHRwczovL3JpbmtlYnkuaW5mdXJhLmlvL3pyZ0VISWNHemZaM0xITm9lbVNFJ1xuICAvLyApO1xuXG4gIGNvbnN0IHByb3ZpZGVyID0gbmV3IFdlYjMucHJvdmlkZXJzLldlYnNvY2tldFByb3ZpZGVyKFxuICAgICd3c3M6Ly9yaW5rZWJ5LmluZnVyYS5pby93cydcbiAgKTtcbiAgLy9pZiB1c2luZyBpbmZ1cmEgYXMgd2ViMyBwcm92aWRlciwgb25seSBnb29kIHRvIFJFQUQgZnJvbSBibG9ja2NoYWluXG4gIC8vaW4gb3JkZXIgdG8gV1JJVEUgdG8gYmxvY2tjaGFpbiwgbWVhbnMgbmVlZCB0byBzaWduIHRyYW5zYWN0aW9ucyB3aXRoXG4gIC8vcHVibGljL3ByaXZhdGUga2V5IHBhaXIsIHRoaXMgcmVxdWlyZXMgYSBNZXRhbWFzayB3ZWIzIHByb3ZpZGVyICh3aGljaCBjb250YWlucyB0aGUgaW5kaXZpZHVhbCB1c2VyJ3MgYWNjb3VudClcblxuICB3ZWIzID0gbmV3IFdlYjMocHJvdmlkZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB3ZWIzO1xuIiwiaW1wb3J0IFwiLi4vY3NzL3BvcHVwLmNzc1wiO1xuLy9uZWVkIHRvIHNlbmQgbG9ncyB0byBiYWNrZ3JvdW5kLmpzXG5pbXBvcnQge2JnbG9nfSBmcm9tIFwiLi9jb21tb24vdXRpbHNcIjtcbi8vIGltcG9ydCBoZWxsbyBmcm9tIFwiLi9wb3B1cC9leGFtcGxlXCI7XG5pbXBvcnQgd2ViMyBmcm9tIFwiLi4vLi4vLi4vZXRoZXJldW0vd2ViM1wiO1xuXG5sZXQgam9pbl9idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvaW5cIik7XG5cbmpvaW5fYnV0dG9uLm9uY2xpY2sgPSBhc3luYyhlbGVtZW50KT0+e1xuICBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgZnVuY3Rpb24odGFicykge1xuICAgIGJnbG9nKCdiZ2xvZyB3b3JraW5nID8/JyArIHRhYnNbMF0uaWQpO1xuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHt0eXBlOiBcImNyZWF0ZV9wbGF5ZXJcIiwgb2JqOiAnZ3JlZXRpbmdzIDIyJ30pO1xuICB9KTtcbn1cblxuLy8gam9pbl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jKGV2ZW50KT0+e1xuLy8gICBhbGVydChcInNvbWUgdGV4dFwiKTtcbi8vICAgYmdsb2coJ3NvbWV0aGluZycpO1xuLy8gICB0cnl7XG4vL1xuLy8gICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgd2ViMy5ldGguZ2V0QWNjb3VudHMoKTtcbi8vICAgICBiZ2xvZyhhY2NvdW50cyk7XG4vLyAgIH1jYXRjaChlKXtcbi8vICAgICBiZ2xvZyhlKTtcbi8vICAgfVxuLy8gfSwgZmFsc2UpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///297\n")}});