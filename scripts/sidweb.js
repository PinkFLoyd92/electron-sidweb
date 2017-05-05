function init() {
    console.log("init...");

    var webview = document.querySelector("webview");

    // When everything is ready, trigger the events without problems
    webview.addEventListener("dom-ready", function() {
	if (this.getTitle().toString().includes("Actividad")) {
	    console.info("DOM-Ready, triggering events !");
	    webview.send("request");
	    webview.send("alert-something", "Hey, i'm alerting this.");
	    webview.send("change-text-element", {
		id: "myelementID",
		text: "My text"
	    });
	}
    });

    // Process the data from the webview
    webview.addEventListener("ipc-message", function(event){
	console.log(event);
	console.info(event.channel);
    });
}

document.addEventListener("DOMContentLoaded", init);
