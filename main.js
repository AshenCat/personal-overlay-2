const {
    app,
    BrowserWindow,
    ipcMain,
    // Notification
} = require('electron');
const mongoose = require('mongoose');
const path = require('path')

const isDev = !app.isPackaged;
let dbFailed = false;

mongoose.connect(
    require('./db/config/config').db, 
    {useNewUrlParser: true, useUnifiedTopology: true})
        .then(con => console.log('connected to mongodb'))
        .catch(err => {
            console.log('failed to connect to mongodb');
            dbFailed=true;
        });

let win;

function createWindow() {
    win = new BrowserWindow({
        width:1366, minWidth:800,
        height: 768, minHeight: 700,
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
    win.webContents.on('did-finish-load', () => {
        if(dbFailed) {
            console.log('dbfailed')
            win.webContents.send('dbfailed', "Could not connect to mongoDB...");
        }
    })
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})


if(isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', 'electron', 'dist', 'electron.exe')
    })
}



ipcMain.on('windowState', (e, msg) => {
    switch(msg) {
        case 'close':
            app.quit();
            break;
        case 'minimize':
            win.minimize();
            break;
        case 'maximize':
            if(win.isMaximized()) win.restore();
            else win.maximize();
            break; 
    }
})

// ipcMain.on('notify', (e, message) => {
//     new Notification({title: 'Notification', body: message}).show()
// })