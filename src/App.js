import React from 'react'
import Body from './layout/Body'
import './app.scss'
import OverdueProvider from './context/OverdueContext/OverdueContext'
import SystemNotif from './context/SystemNotif/SystemNotif'

function App() {
    return (
        <OverdueProvider>
            <SystemNotif>
                <Body />
            </SystemNotif>
        </OverdueProvider>
    )
}

export default App

/*
<h1>app comp</h1>
            <button onClick={()=>{
                electron.notificationApi.sendNotification('my custom notification')
            }}>notify</button>
            */