const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    // notificationApi: {
    //     sendNotification(message) {
    //         console.log(message)
    //         ipcRenderer.send('notify', message)
    //     }
    // },
    windowApi: {
        windowState(action) {
            ipcRenderer.send('windowState', action)
        }
    }
})