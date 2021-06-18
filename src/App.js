import React from 'react'
import Body from './layout/Body'
import './app.scss'
import OverdueProvider from './context/OverdueContext/OverdueContext'

function App() {
    return (
        <OverdueProvider>
            <Body />
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