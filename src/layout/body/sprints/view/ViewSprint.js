import React from 'react'
import { withRouter } from 'react-router'
import './viewsprint.scss'

function ViewSprint({location}) {
    const [sprint, setSprint] = React.useState();

    React.useEffect(() => {
        const sprintID = location.pathname.split('/');
        console.log(sprintID)
        if(sprintID[sprintID.length-1] !== "todos") {
            console.log('should show up when there\'s a sprint selected')

            api.send('LoadSprint', sprintID[sprintID.length-1])
            api.recieve('LoadSprint', (data) => {
                setSprint(data);
                console.log(data);
            })
        }
        if(sprintID[sprintID.length-1] === "todos") {
            console.log('this should not show up when there\'s a selected sprint')
        }
    }, [location.pathname])

    const ShowSprint = () => {
        return <div>
            
        </div>
    }

    return (
        <section className="viewsprint-section">
            {sprint ? <ShowSprint /> : 
                <div 
                    style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        alignContent: 'center', 
                        width: '100%', 
                        height: '100%', 
                        color: 'rgba(255,255,255, .5)'}}>
                            Please Select a sprint...
                </div>}
        </section>
    )
}

export default withRouter(ViewSprint)
