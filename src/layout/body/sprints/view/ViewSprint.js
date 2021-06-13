import React from 'react'
import { Calendar } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { withRouter } from 'react-router'
import Card from '../../../../components/card/Card';
import Select from '../../../../components/select/Select';
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
        return <section className="viewsprint-section">
                <Card style={{width:'95%', flexFlow: 'row'}} noButton>
                    <div className="left">
                        <Calendar 
                                // fixRelativePosition={'center'}
                                className="bg-dark"
                                showOtherDays={true}
                                zIndex={99}
                                value={[sprint?.start, sprint?.end]} 
                                range
                                plugins={[<DatePanel position="bottom" />]} 
                                readOnly
                                />
                    </div>
                    <div className="right">
                        <div className="space-between" style={{maxHeight: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Title: <h3>{sprint?.title}</h3></div>
                        <div className="dflex" style={{justifyContent:'flex-end'}}> - <em>"{sprint?.description}"</em></div>
                        <div className="space-between">
                            Status:
                            <Select 
                                value={sprint?.status}
                                onChange={e=>setSprint(prev=>{
                                    return {...prev, status: e.target.value}
                                })}
                                className={`select-chip chip-${sprint?.status}`}
                            >
                                <option value=''>----</option>
                                <option value='waiting'>Waiting</option>
                                <option value='active'>Active</option>
                                <option value='on hold'>On Hold</option>
                                <option value='failed'>Failed</option>
                            </Select>
                        </div>
                    </div>
                </Card>
            </section>
    }

    return (<>
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
            </>)
}

export default withRouter(ViewSprint)
