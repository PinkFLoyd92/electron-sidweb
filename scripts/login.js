const fs = require("fs");
const {ipcRenderer} = require("electron"); // this is used to communicate the webview with the main Process...


let USERNAME = "";
let PASSWORD = "";

let contents = fs.readFileSync("config").toString();
let arrContens = contents.split("\n").slice(0, 2);

USERNAME = arrContens[0];
PASSWORD = arrContens[1];


/**
 * Function that allows us to get the new announcements from the sidweb page.
 * of the <webview>
 *
 *@returns {Dom Element}
 **/

function getTopics(){
    return document.getElementsByClassName("announcement")[0].innerHTML;
}

// Do something according to a request of your mainview
ipcRenderer.on("request", function(){
    ipcRenderer.sendToHost(getTopics());
});


window.onload = function() {
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-2.1.4.min.js";
    script.onload = script.onreadystatechange = function() {
	$(document).ready(function() {
            $("#username").val(USERNAME);
            $("#password").val(PASSWORD);
	    document.getElementsByClassName("btn-submit")[0].click();
	});
    };
    document.body.appendChild(script);
};
