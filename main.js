const {
    app,
    BrowserWindow,
    ipcMain,
    globalShortcut,
    Tray,
    Menu
    // Notification
} = require('electron');
const mongoose = require('mongoose').set('debug', true);
const path = require('path')

const isDev = !app.isPackaged;
let dbFailed = false;

const version = 'v0.0.0'

const trayMenu = Menu.buildFromTemplate([
    {label: version},
    {label: 'Check for updates'},
    {role: 'quit'},
])

mongoose.connect(
    require('./db/config/config').db, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false
    }).then(con => {
        console.log('connected to mongodb')
    }).catch(err => {
        console.log('failed to connect to mongodb');
        dbFailed=true;
    });

let win, tray;

function createTray() {
    tray = new Tray('./icons/icon.png')
    tray.setToolTip('Personal Overlay')
    tray.setContextMenu(trayMenu)
}

function createWindow() {
    createTray()
    win = new BrowserWindow({
        width:1366, minWidth:900,
        height: 768, minHeight: 650,
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
    globalShortcut.register('CommandOrControl+Shift+~', () => {
        if (win.isVisible()) {
            win.hide()
            console.log('hide')
        } else {
            win.show()
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
            if (win.isMaximized()) win.restore();
            else win.maximize();
            break; 
    }
})

const { 
    onEventAdd,
    onSprintAdd,
    LoadCalendarData,
    LoadSprints,
    LoadSprint,
    EditSprint,
    DeleteSprint,
    LoadEventsWithoutParents,
    LoadSprintsToday,
} = require('./db/controllers/EventController');

ipcMain.on('onEventAdd', (e, data) => onEventAdd(e, data))
ipcMain.on('onSprintAdd', (e, data) => onSprintAdd(e,data))
ipcMain.on('LoadCalendarData', (e, month) => LoadCalendarData(e, month))
ipcMain.on('LoadSprints', LoadSprints)
ipcMain.on('LoadSprint', (e, id) => {LoadSprint(e,id)})
ipcMain.on('EditSprint', (e, sprint) => {EditSprint(e,sprint)})
ipcMain.on('DeleteSprint', (e, id) => {DeleteSprint(e,id)})
ipcMain.on('LoadSprintsToday', LoadSprintsToday)
ipcMain.on('LoadEventsWithoutParents', LoadEventsWithoutParents)


// ipcMain.on('notify', (e, message) => {
//     new Notification({title: 'Notification', body: message}).show()
// })