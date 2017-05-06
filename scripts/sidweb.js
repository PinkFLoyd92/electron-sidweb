const notifier = require("./scripts/ContentNotifier.js");
const spawn = require('child_process').spawn;

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
	arrContents = element.getElementsByClassName("announcement");
	arrContents = Array.from(arrContents);
	for (var i in arrContents) {
	    let arrTopic = notifier.getContent(arrContents[i]);
	    let teacher = arrTopic[0];
	    const notification = spawn('./notify.sh', [teacher]);
	    notification.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	    });

	    notification.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	    });

	    notification.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	    });

	}
    });
}

document.addEventListener("DOMContentLoaded", init);
