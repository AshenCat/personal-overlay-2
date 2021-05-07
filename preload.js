const { ipcRenderer, contextBridge } = require('electron');

const r2mChannels = require('./channels').rendererToMain;
const m2rChannels = require('./channels').mainToRenderer;

contextBridge.exposeInMainWorld('api', {
    // notificationApi: {
    //     sendNotification(message) {
    //         console.log(message)
    //         ipcRenderer.send('notify', message)
    //     }
    // },
    send: (channel, data) => {
        if (r2mChannels.includes(channel)){
            ipcRenderer.send(channel, data)
        }
    },
    recieve: (channel, func) => {
        if (m2rChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
    },
    removeAllListeners: (channel) => {
        if ([...m2rChannels, ...r2mChannels].includes(channel))
            ipcRenderer.removeAllListeners(channel)
    },
    onDbErr: (func) => {
        ipcRenderer.once('dbfailed', (event, arg) => {
            // console.log(arg)
            func(arg)
        })
    }
})