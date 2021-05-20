import React from 'react'
import { withRouter } from 'react-router'
import Card from '../../../../components/card/Card';

function SprintDetails(props) {
    const {location} = props;

    const [sprint, setSprint] = React.useState();
    
    React.useEffect(()=>{
        console.log(location.pathname.split('/')[2])
        api.send('LoadSprint', location.pathname.split('/')[2])
        api.recieve('LoadSprint', (data) => {
            setSprint(data);
            console.log(data)
        })
        // api.receive()
        return () => {
            api.removeAllListeners('LoadSprint')
        }
    }, [])

    return (
        <article className="view-sprint">
            <Card>a</Card>
            <Card>b</Card>
        </article>
    )
}

export default withRouter(SprintDetails)
