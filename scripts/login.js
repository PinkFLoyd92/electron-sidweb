const path = require('path');
const fs = require('fs');

let USERNAME = "";
let PASSWORD = "";

let contents = fs.readFileSync('config').toString();
let arr_contens = contents.split('\n').slice(0,2);
USERNAME = arr_contens[0];
PASSWORD = arr_contens[1];

const {ipcRenderer} = require('electron'); // this is used to communicate the webview with the main Process...

// Do something according to a request of your mainview
ipcRenderer.on('request', function(){
    ipcRenderer.sendToHost(getScripts());
});

ipcRenderer.on("alert-something",function(event,data){
    alert(data);
});

ipcRenderer.on("change-text-element",function(event,data){
    // the document references to the document of the <webview>
    document.getElementById(data.id).innerHTML = data.text;
});

/**
 * Simple function to return the source path of all the scripts in the document
 * of the <webview>
 *
 *@returns {String}
 **/
function getScripts(){
    var items = [];
    
    for(var i = 0;i < document.scripts.length;i++){
        items.push(document.scripts[i].src);
    }
    
    return JSON.stringify(items);
}

window.onload = function() {
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-2.1.4.min.js";
    script.onload = script.onreadystatechange = function() {
	$(document).ready(function() {
            $("#username").val(USERNAME);
            $("#password").val(PASSWORD);
	    document.getElementsByClassName('btn-submit')[0].click();
	});
    };
    document.body.appendChild(script);
};
