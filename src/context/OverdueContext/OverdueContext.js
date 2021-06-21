import moment from 'moment';
import React from 'react'

const OverdueContext = React.createContext();

export const useOverdueContext = () => {
    return React.useContext(OverdueContext);
}

function OverdueProvider(props) {
    const [overdueEvents, setOverdueEvents] = React.useState([]);
    const [overdueSprints, setOverdueSprints] = React.useState([]);
    
    const queryOverdueSprints = () => {
        api.send('queryOverdueSprints', {});
    }

    const queryOverdueEvents = () => {
        api.send('queryOverdueEvents', {});
    }

    React.useEffect(() => {
        // api.send('queryOverdueSprints', {});
        api.recieve('queryOverdueSprints', data => {
            // console.log('Overdue Sprints:')
            console.log(data)
            setOverdueSprints(data)
        })
        // api.send('queryOverdueEvents', {});
        api.recieve('queryOverdueEvents', data => {
            // console.log('Overdue Events:')
            console.log(data)
            setOverdueEvents(data)
        })
        return () => {
            api.removeAllListeners('queryOverdueSprints')
            api.removeAllListeners('queryOverdueEvents')
        }
    }, [])

    React.useEffect(()=>{
        console.log('Set interval 30 minutes')
        console.log(new Date())
        
        const interval = setInterval(()=>{
            api.send('queryOverdueSprints', {});
            api.send('queryOverdueEvents', {});
            console.log('Querying overdues...')
        }, 1000 * 60 * 30)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <OverdueContext.Provider value={{overdueEvents, overdueSprints, queryOverdueEvents, queryOverdueSprints}}>
            {props.children}
        </OverdueContext.Provider>
    )
}

export default OverdueProvider
