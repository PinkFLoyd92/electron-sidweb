'use-strict';
const path = require('path');
const electron = require('electron');
const TrayIcon = require('./tray.js');
const {app, session} = electron;
let mainWindow;
const ZOOMFACTOR = 1;
let WIDTH = 800, HEIGHT = 800;

let shouldQuit = app.makeSingleInstance(() => {
    if (mainWindow) {
	if (mainWindow.isMinimized()){
	    mainWindow.restore();
	    mainWindow.focus();
	}
    }
});

if (shouldQuit) {
    app.quit();
}


app.setName('Sidweb');
app.on('before-quit', () => shouldQuit = true);

app.on('ready', () => {
    currentSession = session.fromPartition('persist:sidweb');
    mainWindow = new electron.BrowserWindow({
	width: WIDTH,
	height: HEIGHT,
	icon: app.getAppPath() + '/assets/tray/sidweb.png',
	webPreferences: {
	   //partition: 'persist:sidweb',
	    nodeIntegration: false,
	    zoomFactor: ZOOMFACTOR,
	    preload: path.join(__dirname, 'scripts/login.js')
	}
    });


    mainWindow.on('close', () =>{
	shouldQuit = shouldQuit;
	app.quit();
    });

    TrayIcon.init(mainWindow);
    mainWindow.webContents.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36");
    mainWindow.loadURL("http://www.sidweb.espol.edu.ec");
    mainWindow.focus();
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
	mainWindow = null;
    });

});
electron.ipcMain.on('init', () => {
    console.info('Started Sidweb Script\'s injection');
});

electron.ipcMain.on('refresh', () => {
    console.info('Refreshing main content');
    mainWindow.reload();
});


/**
 * Event that receives the topics array from the renderer
 *@returns {Dom Element}
 **/
electron.ipcMain.on('topic-dom', (evt, domArray) => {
    console.info('Reading the topics...');
});
