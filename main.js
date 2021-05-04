const {
    app,
    BrowserWindow,
    ipcMain,
    Notification
} = require('electron');
const path = require('path')

const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        width:1366, minWidth:600,
        height: 768, minHeight: 768,
        backgroundColor: "#333333",
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.webContents.openDevTools();
    win.loadFile('./index.html')
}

if(isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

ipcMain.on('notify', (e, message) => {
    new Notification({title: 'Notification', body: message}).show()
})

app.whenReady().then(createWindow)