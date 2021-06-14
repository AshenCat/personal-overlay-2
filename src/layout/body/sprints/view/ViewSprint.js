import React from 'react'
import { Calendar } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { withRouter } from 'react-router'
import Button from '../../../../components/button/Button';
import Select from '../../../../components/select/Select';
import './viewsprint.scss'

function ViewSprint({location}) {
    const [sprint, setSprint] = React.useState();
    // const [qstatus, setQStatus] = React.useState();

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
        else {
            console.log('this should not show up when there\'s a selected sprint')
        }
        return () => {
            api.removeAllListeners('LoadSprint')
        }
    }, [location.pathname])

    React.useEffect(() => {
        const sprintID = location.pathname.split('/');
        api.recieve('EditSprint', (data)=>{
            api.send('LoadSprint', sprintID[sprintID.length-1])
        })
        return () => {
            api.removeAllListeners('EditSprint')
        }
    }, [])

    const changeStatus = (e) => {
        if(e.target.value !== '') api.send('EditSprint', {...sprint, status: e.target.value})
    }

    const ShowSprint = () => {
        return  <>
                    <div className="topleft">
                        <div><h3>{sprint?.title}</h3></div>
                        <div className="" style={{marginLeft: '15px', marginTop: '15px'}}> - <em>"{sprint?.description}"</em></div>
                        <div className="" style={{alignSelf: 'flex-start'}}>
                            Status:
                            <Select 
                                defaultValue={sprint?.status} 
                                style={{marginLeft: '15px', marginTop: '15px'}}
                                onChange={changeStatus}
                                className={`select-chip chip-${sprint?.status.replace(/\s/g,'')}`}
                            >
                                <option value=''>----</option>
                                <option value='waiting'>Waiting</option>
                                <option value='active'>Active</option>
                                <option value='on hold'>On Hold</option>
                                <option value='failed'>Failed</option>
                            </Select>
                        </div>
                        <div style={{display:'flex', alignItems: 'center', flexFlow: 'column', marginTop: '30px'}}>
                            <Calendar 
                                // fixRelativePosition={'center'}
                                className="bg-dark"
                                showOtherDays={true}
                                zIndex={99}
                                value={[sprint?.start, sprint?.end]} 
                                range
                                plugins={[<DatePanel position='right' />]} 
                                readOnly
                                />
                                <div className="card-actions">
                                <Button 
                                    style={{ flex:1}}
                                    className="edit-btn"
                                    onClick={()=>{props.history.push(`/sprints/${data._id}`)}}>
                                        Edit
                                </Button>
                                <Button
                                    style={{ flex:1}}
                                    onClick={()=>onDelete(data._id)}
                                    className="danger-btn">
                                        Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="bottomright">
                        <div className="eventsheader">
                            <h4>Events:</h4>
                        </div>
                    </div>
                </>
    }

    return (<>
                <div style={{display:'flex', justifyContent: 'center'}}><h2>SPRINT</h2></div>
                {sprint ?  <section className="viewsprint-section"><ShowSprint /></section> : 
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
