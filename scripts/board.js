function init() {
    console.log("init...");

    var webview = document.querySelector("webview");

    // When everything is ready, trigger the events without problems
    webview.addEventListener("dom-ready", function() {
	console.log("DOM-Ready, triggering events !");
	
	webview.send("request");
	
	webview.send("alert-something", "Hey, i'm alerting this.");
	
	webview.send("change-text-element",{
            id: "myelementID",
            text: "My text"
	});
    });

    // Process the data from the webview
    webview.addEventListener('ipc-message',function(event){
	console.log(event);
	console.info(event.channel);
    });
    // ar webview = document.querySelector('webview');
    // webview.addEventListener('did-finish-load', function () {
    // 	// console.log("finished loading content in webview...");
    // 	if (this.getTitle().toString().includes("Actividad")) {
    // 	    console.log('We are now in Actividad Reciente...');
    // 	}
    // });
    // webview.addEventListener('dom-ready', function () {
    // 	//webview.openDevTools();
    // });
}

document.addEventListener("DOMContentLoaded", init);
