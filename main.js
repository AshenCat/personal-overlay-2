const {
    app,
    BrowserWindow,
    ipcMain,
    // Notification
} = require('electron');
const path = require('path')

const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        width:1366, minWidth:800,
        height: 768, minHeight: 600,
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
    return win;
}

let window;
app.whenReady().then(() => {
    window = createWindow();
})


if(isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

ipcMain.on('windowState', (e, msg) => {
    switch(msg) {
        case 'close':
            app.quit();
            break;
        case 'minimize':
            window.minimize();
            break;
        case 'maximize':
            if(window.isMaximized()) window.restore();
            else window.maximize();
            break; 
    }

})

// ipcMain.on('notify', (e, message) => {
//     new Notification({title: 'Notification', body: message}).show()
// })