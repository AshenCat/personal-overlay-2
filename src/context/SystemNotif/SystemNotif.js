import React from 'react'

const SystemNotifContext = React.createContext();

export const useSystemNotif = () => {
    return React.useContext(SystemNotifContext)
}

function SystemNotif(props) {
    const [Events, setEvents] = React.useState();
    const [Sprints, setSprints] = React.useState();

    React.useEffect(()=>{
        api.send('getSystemNotifEvents', {})
        api.recieve('getSystemNotifEvents', data => {
            console.log(data)
        })
        api.send('getSystemNotifSprints', {})
        api.recieve('getSystemNotifSprints', data => {
            console.log(data)
        })
        return () => {
            api.removeAllListeners('getSystemNotifEvents')
            api.removeAllListeners('getSystemNotifSprints')
        }
    }, [])

    React.useEffect(()=>{
        const interval = setInterval(()=>{
            
        }, 1000 * 60) // 60 seconds
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <SystemNotifContext.Provider value={{}}>
            {props.children}
        </SystemNotifContext.Provider>
    )
}

export default SystemNotif