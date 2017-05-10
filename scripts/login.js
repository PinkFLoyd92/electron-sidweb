/**
 * Using this script we load our credentials, and go the the main sidweb page. Also here we launch our sidweb.js script.
 **/

const fs = require('fs');
const path = require('path');
const Sidweb = require(path.join(__dirname, 'sidweb.js'));

let USERNAME;
let PASSWORD;

let contents = fs.readFileSync('config').toString();
let arrContens = contents.split('\n').slice(0, 2);

USERNAME = arrContens[0];
PASSWORD = arrContens[1];


window.onload = function() {
    let script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-2.1.4.min.js";
    script.onload = script.onreadystatechange = function() {
	$(document).ready(function() {
	    if (document.getElementsByClassName('btn-submit')[0] !== undefined){
		$('#username').val(USERNAME);
		$('#password').val(PASSWORD);
		document.getElementsByClassName('btn-submit')[0].click();
	    }
	});
    };
    document.body.appendChild(script);
    if (document.getElementsByClassName('btn-submit').length === 0){
	Sidweb.init();
    }
};
