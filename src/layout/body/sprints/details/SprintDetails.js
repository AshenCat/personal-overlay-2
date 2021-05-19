import React from 'react'
import { withRouter } from 'react-router'

function SprintDetails(props) {
    const {location} = props;

    const [sprint, setSprint] = React.useState();
    
    React.useEffect(()=>{
        console.log(location)
        api.send('LoadSprint', {})
        api.recieve('LoadSprint', (data) => {
            setSprint([...data]);
        })
        // api.receive()
        return () => {
            api.removeAllListeners('LoadSprint')
        }
    }, [])

    return (
        <>
            
        </>
    )
}

export default withRouter(SprintDetails)
