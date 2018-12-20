const {app, BrowserWindow, ipcMain} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        frame: false,
        show: false,
        minWidth:640,
        minHeight:360,
        webPreferences: {
            webSecurity: false,
            devTools: true
        },
        useContentSize: true
    });

    mainWindow.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`,
    );

    mainWindow.on('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'drawin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    } 
})

ipcMain.on('resize', (event, width, height) => {
    console.log(`${width} x ${height}`);
    mainWindow.setSize(width, height);
    // mainWindow.setMinimumSize(width, height);
});
