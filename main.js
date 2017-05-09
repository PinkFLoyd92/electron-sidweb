'use-strict';
const electron = require('electron');
const fs       = require('fs');
const path     = require('path');
const TrayIcon = require('./tray.js');

const {app} = electron;
let mainWindow;

let shouldQuit = app.makeSingleInstance(() => {
	if (mainWindow) {
		mainWindow.show();
		mainWindow.focus();
	}
});

if (shouldQuit) {
	app.quit();
}


app.setName('Sidweb');
app.on('before-quit', () => shouldQuit = true);

app.on('ready', () => {
    // Create the browser window.
    mainWindow = new electron.BrowserWindow({width: 800,
					     height: 600,
					     icon: app.getAppPath() + '/assets/tray/sidweb.png'});

    // and load the index.html of the app
    mainWindow.loadURL("file://" + __dirname + "/index.html");
    mainWindow.focus();
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
	mainWindow = null;
    });

    mainWindow.on('page-title-updated', function(event, title) {
	console.info('Updated title event fired....' + title);
    });
});
