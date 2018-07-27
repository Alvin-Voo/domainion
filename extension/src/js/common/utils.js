// function bglog(obj) {
// 	if(chrome && chrome.runtime) {
// 		chrome.runtime.sendMessage({type: "bglog", obj: obj});
// 	}
// }

function parseHostname(url){
	let parser = document.createElement('a');
	parser.href = url;

	return parser.hostname;
}

export {parseHostname};
