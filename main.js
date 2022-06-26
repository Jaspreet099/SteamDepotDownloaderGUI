const {app, BrowserWindow} = require("electron")

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		autoHideMenuBar: true,
		resizable: false,
		width: 425,
		height: 575,
		maximizable: false, // lol this does not work on kde plasma
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			"disableBlinkFeatures ": "Auxclick"
		}
	})

	// and load the index.html of the app.
    mainWindow.loadFile("index.html")
	//TODO: don't do this in the release lol
	mainWindow.webContents.openDevTools({mode: "detach"})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow()

	app.on("activate", () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit()
})
