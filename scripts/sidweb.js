function init() {
    console.log("init...");

    var webview = document.querySelector("webview");

    // When everything is ready, trigger the events without problems
    webview.addEventListener("dom-ready", function() {
	if (this.getTitle().toString().includes("Actividad")) {
	    console.info("DOM-Ready, triggering events !");
	    webview.send("request");
	}
    });

    // Process the data from the webview
    webview.addEventListener("ipc-message", function(evt){
	let message = evt.channel;
	let parser = new DOMParser();
	let element = parser.parseFromString(message, "text/html");
	arrContents = element.getElementsByClassName("header");
	arrContents = Array.from(arrContents);
	arrContents = arrContents.slice(0, arrContents.length - 1);
	console.log(arrContents[0].innerHTML);

    });
}

document.addEventListener("DOMContentLoaded", init);
