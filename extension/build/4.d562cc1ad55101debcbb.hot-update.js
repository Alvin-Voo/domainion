webpackHotUpdate(4,{296:function(module,exports){eval('//console logs to web page\nconsole.log(window.web3);\n\nvar CircularJSON=function(JSON,RegExp){var specialChar="~",safeSpecialChar="\\\\x"+("0"+specialChar.charCodeAt(0).toString(16)).slice(-2),escapedSafeSpecialChar="\\\\"+safeSpecialChar,specialCharRG=new RegExp(safeSpecialChar,"g"),safeSpecialCharRG=new RegExp(escapedSafeSpecialChar,"g"),safeStartWithSpecialCharRG=new RegExp("(?:^|([^\\\\\\\\]))"+escapedSafeSpecialChar),indexOf=[].indexOf||function(v){for(var i=this.length;i--&&this[i]!==v;);return i},$String=String;function generateReplacer(value,replacer,resolve){var doNotIgnore=false,inspect=!!replacer,path=[],all=[value],seen=[value],mapp=[resolve?specialChar:"[Circular]"],last=value,lvl=1,i,fn;if(inspect){fn=typeof replacer==="object"?function(key,value){return key!==""&&replacer.indexOf(key)<0?void 0:value}:replacer}return function(key,value){if(inspect)value=fn.call(this,key,value);if(doNotIgnore){if(last!==this){i=lvl-indexOf.call(all,this)-1;lvl-=i;all.splice(lvl,all.length);path.splice(lvl-1,path.length);last=this}if(typeof value==="object"&&value){if(indexOf.call(all,value)<0){all.push(last=value)}lvl=all.length;i=indexOf.call(seen,value);if(i<0){i=seen.push(value)-1;if(resolve){path.push((""+key).replace(specialCharRG,safeSpecialChar));mapp[i]=specialChar+path.join(specialChar)}else{mapp[i]=mapp[0]}}else{value=mapp[i]}}else{if(typeof value==="string"&&resolve){value=value.replace(safeSpecialChar,escapedSafeSpecialChar).replace(specialChar,safeSpecialChar)}}}else{doNotIgnore=true}return value}}function retrieveFromPath(current,keys){for(var i=0,length=keys.length;i<length;current=current[keys[i++].replace(safeSpecialCharRG,specialChar)]);return current}function generateReviver(reviver){return function(key,value){var isString=typeof value==="string";if(isString&&value.charAt(0)===specialChar){return new $String(value.slice(1))}if(key==="")value=regenerate(value,value,{});if(isString)value=value.replace(safeStartWithSpecialCharRG,"$1"+specialChar).replace(escapedSafeSpecialChar,safeSpecialChar);return reviver?reviver.call(this,key,value):value}}function regenerateArray(root,current,retrieve){for(var i=0,length=current.length;i<length;i++){current[i]=regenerate(root,current[i],retrieve)}return current}function regenerateObject(root,current,retrieve){for(var key in current){if(current.hasOwnProperty(key)){current[key]=regenerate(root,current[key],retrieve)}}return current}function regenerate(root,current,retrieve){return current instanceof Array?regenerateArray(root,current,retrieve):current instanceof $String?current.length?retrieve.hasOwnProperty(current)?retrieve[current]:retrieve[current]=retrieveFromPath(root,current.split(specialChar)):root:current instanceof Object?regenerateObject(root,current,retrieve):current}var CircularJSON={stringify:function stringify(value,replacer,space,doNotResolve){return CircularJSON.parser.stringify(value,generateReplacer(value,replacer,!doNotResolve),space)},parse:function parse(text,reviver){return CircularJSON.parser.parse(text,generateReviver(reviver))},parser:JSON};return CircularJSON}(JSON,RegExp);\n\nif(typeof window.web3 !== \'undefined\'){\n  setTimeout(function() {\n    /* Example: Send data from the page to your Chrome extension */\n    document.dispatchEvent(new CustomEvent(\'GET_PROVIDER\', {\n        detail: CircularJSON.stringify(window.web3.currentProvider)\n    }));\n  }, 500);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjk2LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZXh0ZW5zaW9uL3NyYy9qcy9zY3JpcHQuanM/NGVkZCJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2NvbnNvbGUgbG9ncyB0byB3ZWIgcGFnZVxuY29uc29sZS5sb2cod2luZG93LndlYjMpO1xuXG52YXIgQ2lyY3VsYXJKU09OPWZ1bmN0aW9uKEpTT04sUmVnRXhwKXt2YXIgc3BlY2lhbENoYXI9XCJ+XCIsc2FmZVNwZWNpYWxDaGFyPVwiXFxcXHhcIisoXCIwXCIrc3BlY2lhbENoYXIuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSxlc2NhcGVkU2FmZVNwZWNpYWxDaGFyPVwiXFxcXFwiK3NhZmVTcGVjaWFsQ2hhcixzcGVjaWFsQ2hhclJHPW5ldyBSZWdFeHAoc2FmZVNwZWNpYWxDaGFyLFwiZ1wiKSxzYWZlU3BlY2lhbENoYXJSRz1uZXcgUmVnRXhwKGVzY2FwZWRTYWZlU3BlY2lhbENoYXIsXCJnXCIpLHNhZmVTdGFydFdpdGhTcGVjaWFsQ2hhclJHPW5ldyBSZWdFeHAoXCIoPzpefChbXlxcXFxcXFxcXSkpXCIrZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciksaW5kZXhPZj1bXS5pbmRleE9mfHxmdW5jdGlvbih2KXtmb3IodmFyIGk9dGhpcy5sZW5ndGg7aS0tJiZ0aGlzW2ldIT09djspO3JldHVybiBpfSwkU3RyaW5nPVN0cmluZztmdW5jdGlvbiBnZW5lcmF0ZVJlcGxhY2VyKHZhbHVlLHJlcGxhY2VyLHJlc29sdmUpe3ZhciBkb05vdElnbm9yZT1mYWxzZSxpbnNwZWN0PSEhcmVwbGFjZXIscGF0aD1bXSxhbGw9W3ZhbHVlXSxzZWVuPVt2YWx1ZV0sbWFwcD1bcmVzb2x2ZT9zcGVjaWFsQ2hhcjpcIltDaXJjdWxhcl1cIl0sbGFzdD12YWx1ZSxsdmw9MSxpLGZuO2lmKGluc3BlY3Qpe2ZuPXR5cGVvZiByZXBsYWNlcj09PVwib2JqZWN0XCI/ZnVuY3Rpb24oa2V5LHZhbHVlKXtyZXR1cm4ga2V5IT09XCJcIiYmcmVwbGFjZXIuaW5kZXhPZihrZXkpPDA/dm9pZCAwOnZhbHVlfTpyZXBsYWNlcn1yZXR1cm4gZnVuY3Rpb24oa2V5LHZhbHVlKXtpZihpbnNwZWN0KXZhbHVlPWZuLmNhbGwodGhpcyxrZXksdmFsdWUpO2lmKGRvTm90SWdub3JlKXtpZihsYXN0IT09dGhpcyl7aT1sdmwtaW5kZXhPZi5jYWxsKGFsbCx0aGlzKS0xO2x2bC09aTthbGwuc3BsaWNlKGx2bCxhbGwubGVuZ3RoKTtwYXRoLnNwbGljZShsdmwtMSxwYXRoLmxlbmd0aCk7bGFzdD10aGlzfWlmKHR5cGVvZiB2YWx1ZT09PVwib2JqZWN0XCImJnZhbHVlKXtpZihpbmRleE9mLmNhbGwoYWxsLHZhbHVlKTwwKXthbGwucHVzaChsYXN0PXZhbHVlKX1sdmw9YWxsLmxlbmd0aDtpPWluZGV4T2YuY2FsbChzZWVuLHZhbHVlKTtpZihpPDApe2k9c2Vlbi5wdXNoKHZhbHVlKS0xO2lmKHJlc29sdmUpe3BhdGgucHVzaCgoXCJcIitrZXkpLnJlcGxhY2Uoc3BlY2lhbENoYXJSRyxzYWZlU3BlY2lhbENoYXIpKTttYXBwW2ldPXNwZWNpYWxDaGFyK3BhdGguam9pbihzcGVjaWFsQ2hhcil9ZWxzZXttYXBwW2ldPW1hcHBbMF19fWVsc2V7dmFsdWU9bWFwcFtpXX19ZWxzZXtpZih0eXBlb2YgdmFsdWU9PT1cInN0cmluZ1wiJiZyZXNvbHZlKXt2YWx1ZT12YWx1ZS5yZXBsYWNlKHNhZmVTcGVjaWFsQ2hhcixlc2NhcGVkU2FmZVNwZWNpYWxDaGFyKS5yZXBsYWNlKHNwZWNpYWxDaGFyLHNhZmVTcGVjaWFsQ2hhcil9fX1lbHNle2RvTm90SWdub3JlPXRydWV9cmV0dXJuIHZhbHVlfX1mdW5jdGlvbiByZXRyaWV2ZUZyb21QYXRoKGN1cnJlbnQsa2V5cyl7Zm9yKHZhciBpPTAsbGVuZ3RoPWtleXMubGVuZ3RoO2k8bGVuZ3RoO2N1cnJlbnQ9Y3VycmVudFtrZXlzW2krK10ucmVwbGFjZShzYWZlU3BlY2lhbENoYXJSRyxzcGVjaWFsQ2hhcildKTtyZXR1cm4gY3VycmVudH1mdW5jdGlvbiBnZW5lcmF0ZVJldml2ZXIocmV2aXZlcil7cmV0dXJuIGZ1bmN0aW9uKGtleSx2YWx1ZSl7dmFyIGlzU3RyaW5nPXR5cGVvZiB2YWx1ZT09PVwic3RyaW5nXCI7aWYoaXNTdHJpbmcmJnZhbHVlLmNoYXJBdCgwKT09PXNwZWNpYWxDaGFyKXtyZXR1cm4gbmV3ICRTdHJpbmcodmFsdWUuc2xpY2UoMSkpfWlmKGtleT09PVwiXCIpdmFsdWU9cmVnZW5lcmF0ZSh2YWx1ZSx2YWx1ZSx7fSk7aWYoaXNTdHJpbmcpdmFsdWU9dmFsdWUucmVwbGFjZShzYWZlU3RhcnRXaXRoU3BlY2lhbENoYXJSRyxcIiQxXCIrc3BlY2lhbENoYXIpLnJlcGxhY2UoZXNjYXBlZFNhZmVTcGVjaWFsQ2hhcixzYWZlU3BlY2lhbENoYXIpO3JldHVybiByZXZpdmVyP3Jldml2ZXIuY2FsbCh0aGlzLGtleSx2YWx1ZSk6dmFsdWV9fWZ1bmN0aW9uIHJlZ2VuZXJhdGVBcnJheShyb290LGN1cnJlbnQscmV0cmlldmUpe2Zvcih2YXIgaT0wLGxlbmd0aD1jdXJyZW50Lmxlbmd0aDtpPGxlbmd0aDtpKyspe2N1cnJlbnRbaV09cmVnZW5lcmF0ZShyb290LGN1cnJlbnRbaV0scmV0cmlldmUpfXJldHVybiBjdXJyZW50fWZ1bmN0aW9uIHJlZ2VuZXJhdGVPYmplY3Qocm9vdCxjdXJyZW50LHJldHJpZXZlKXtmb3IodmFyIGtleSBpbiBjdXJyZW50KXtpZihjdXJyZW50Lmhhc093blByb3BlcnR5KGtleSkpe2N1cnJlbnRba2V5XT1yZWdlbmVyYXRlKHJvb3QsY3VycmVudFtrZXldLHJldHJpZXZlKX19cmV0dXJuIGN1cnJlbnR9ZnVuY3Rpb24gcmVnZW5lcmF0ZShyb290LGN1cnJlbnQscmV0cmlldmUpe3JldHVybiBjdXJyZW50IGluc3RhbmNlb2YgQXJyYXk/cmVnZW5lcmF0ZUFycmF5KHJvb3QsY3VycmVudCxyZXRyaWV2ZSk6Y3VycmVudCBpbnN0YW5jZW9mICRTdHJpbmc/Y3VycmVudC5sZW5ndGg/cmV0cmlldmUuaGFzT3duUHJvcGVydHkoY3VycmVudCk/cmV0cmlldmVbY3VycmVudF06cmV0cmlldmVbY3VycmVudF09cmV0cmlldmVGcm9tUGF0aChyb290LGN1cnJlbnQuc3BsaXQoc3BlY2lhbENoYXIpKTpyb290OmN1cnJlbnQgaW5zdGFuY2VvZiBPYmplY3Q/cmVnZW5lcmF0ZU9iamVjdChyb290LGN1cnJlbnQscmV0cmlldmUpOmN1cnJlbnR9dmFyIENpcmN1bGFySlNPTj17c3RyaW5naWZ5OmZ1bmN0aW9uIHN0cmluZ2lmeSh2YWx1ZSxyZXBsYWNlcixzcGFjZSxkb05vdFJlc29sdmUpe3JldHVybiBDaXJjdWxhckpTT04ucGFyc2VyLnN0cmluZ2lmeSh2YWx1ZSxnZW5lcmF0ZVJlcGxhY2VyKHZhbHVlLHJlcGxhY2VyLCFkb05vdFJlc29sdmUpLHNwYWNlKX0scGFyc2U6ZnVuY3Rpb24gcGFyc2UodGV4dCxyZXZpdmVyKXtyZXR1cm4gQ2lyY3VsYXJKU09OLnBhcnNlci5wYXJzZSh0ZXh0LGdlbmVyYXRlUmV2aXZlcihyZXZpdmVyKSl9LHBhcnNlcjpKU09OfTtyZXR1cm4gQ2lyY3VsYXJKU09OfShKU09OLFJlZ0V4cCk7XG5cbmlmKHR5cGVvZiB3aW5kb3cud2ViMyAhPT0gJ3VuZGVmaW5lZCcpe1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIC8qIEV4YW1wbGU6IFNlbmQgZGF0YSBmcm9tIHRoZSBwYWdlIHRvIHlvdXIgQ2hyb21lIGV4dGVuc2lvbiAqL1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdHRVRfUFJPVklERVInLCB7XG4gICAgICAgIGRldGFpbDogQ2lyY3VsYXJKU09OLnN0cmluZ2lmeSh3aW5kb3cud2ViMy5jdXJyZW50UHJvdmlkZXIpXG4gICAgfSkpO1xuICB9LCA1MDApO1xufVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///296\n')}});