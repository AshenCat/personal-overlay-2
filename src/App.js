import React from 'react'

function App() {
    return (
        <>
            <h1>app comp</h1>
            <button onClick={()=>{
                electron.notificationApi.sendNotification('my custom notification')
            }}>notify</button>
        </>
    )
}

export default App
