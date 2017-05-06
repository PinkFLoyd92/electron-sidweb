module.exports = {
    getContent: function($element) {
	let splittedMessage = "";
	let compressedMessage = "";
	let teacher, date = "";
	console.info("Here we get the actual content from the Sidweb's topic");
	// console.info($element);
	teacher = $element.querySelector(".user_name").innerHTML; // teacher's name...
	splittedMessage = $element.querySelector(".content").querySelector(".message_short");
	let children = splittedMessage.childNodes;
	for(let i = 0; i < children.length; i++) {
	    if (children[i].innerHTML !== undefined) {
		compressedMessage = compressedMessage.concat(children[i].innerHTML, " ");
	    }
	}
	// console.log(compressedMessage); //mensaje nuevo...
	// console.log(teacher);
	return [teacher, compressedMessage];
    }
};
