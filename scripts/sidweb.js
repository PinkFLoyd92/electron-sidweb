const path = require('path');
const notifier = require(path.join(__dirname, 'ContentNotifier.js'));
const spawn = require('child_process').spawn;
const {ipcRenderer} = require('electron');
const TIMEOUT = 3500;

/**
 * Function that allows us to get the new announcements from the sidweb page.
 *@returns {Dom Element}
 **/
let getTopics = () => {
    let topicList = document.getElementById('topic_list');
    let element = topicList;
    let notification;
    let arrAnnouncements = element.getElementsByClassName('announcement');
    let arrCommunications = element.getElementsByClassName('communication_message');
    arrAnnouncements = Array.from(arrAnnouncements);
    arrCommunications = Array.from(arrCommunications);
    for (var i in arrCommunications) {
    	let arrTopic = notifier.getContent(arrCommunications[i], 'communication_message');
    	let teacher = arrTopic[0];
	console.log(teacher);
    	notification = spawn('./notify.sh', [teacher]);

	notification.stdout.on('data', (data) => {
    	    console.log(`stdout: ${data}`);
	    return teacher;
	});

	notification.stderr.on('data', (data) => {
    	    console.log(`stderr: ${data}`);
	});

	notification.on('close', (code) => {
    	    console.log(`child process exited with code ${code}`);
	});

    }
    for (var i in arrAnnouncements) {
    	let arrTopic = notifier.getContent(arrAnnouncements[i], 'announcement');
    	let teacher = arrTopic[0];
	console.log(teacher);
    	notification = spawn('./notify.sh', [teacher]);

	notification.stdout.on('data', (data) => {
    	    console.log(`stdout: ${data}`);
	    return teacher;
	});

	notification.stderr.on('data', (data) => {
    	    console.log(`stderr: ${data}`);
	});

	notification.on('close', (code) => {
    	    console.log(`child process exited with code ${code}`);
	});

    }
};

/**
 * The main process is the one who asks for the topics from the renderer process.
 *@returns {Dom Element}
 **/

exports.init = function() {
    // });
    let checkUpdates = () => {
	setInterval(function () {
	    ipcRenderer.send('topic-dom', getTopics());
            ipcRenderer.send('refresh');
	}
		    , TIMEOUT); // Refreshing the sidweb.)
    };
    checkUpdates();
    // Process the data from the webview
    // webview.addEventListener("ipc-message", function(evt){
    // });
};

