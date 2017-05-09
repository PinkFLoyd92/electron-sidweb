const electron = require('electron');

let trayIcon = null;
let mainWindow = null;
let basePath = null;

exports.init = function(window) {
	mainWindow = window;
	basePath = electron.app.getAppPath() + '/assets/tray/';
	trayIcon = new electron.Tray(`${basePath}sidweb.png`);

	trayIcon.on('click', toggleOpen);
	trayIcon.setToolTip('Sidweb');
	trayIcon.setContextMenu(contextMenu);
};

function toggleOpen() {
	if (mainWindow.isFocused()) {
		mainWindow.hide();
	} else {
		mainWindow.show();
		mainWindow.focus();
	}
}

let contextMenu = new electron.Menu.buildFromTemplate([
	{
		label: 'Open',
		click: () => {
			mainWindow.show();
			mainWindow.focus();
		}
	},
	{
		label: 'Reload/Refresh',
		click: () => {
			mainWindow.show();
			mainWindow.reload();
		}
	},
	{
		role: 'quit',
		label: 'Exit',
		click: () => electron.app.quit()
	}
]);
