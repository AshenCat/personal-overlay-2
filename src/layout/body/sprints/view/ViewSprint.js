import moment from 'moment';
import React from 'react'
import { Calendar } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { withRouter } from 'react-router'
import Button from '../../../../components/button/Button';
import SimpleCheckbox from '../../../../components/checkbox/simple/SimpleCheckbox';
import Select from '../../../../components/select/Select';
import './viewsprint.scss'

function ViewSprint({location, history, changeSprintInArray}) {
    const [sprint, setSprint] = React.useState();
    // const [qstatus, setQStatus] = React.useState();

    React.useEffect(() => {
        const urlSplit = location.pathname.split('/');
        console.log(urlSplit)
        if(urlSplit[urlSplit.length-1] !== "todos") {
            console.log('should show up when there\'s a sprint selected')

            api.send('LoadSprint', urlSplit[urlSplit.length-1])
            api.recieve('LoadSprint', (data) => {
                setSprint(data);
                changeSprintInArray(data)
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
        api.recieve('EditSprint', (data)=>{
            const msgSplit = data.split(' ');
            // console.log(data)
            api.send('LoadSprint', msgSplit[msgSplit.length-1])
        })
        api.recieve('ChangeEventStatus', (newEvent)=>{
            // console.log(newEvent)
            setSprint(prev => {
                return {
                    ...prev,
                    events: [...prev.events.map(event => event._id === newEvent._id ? {...event, status: !event.status} : event)]
                }
            })
        })
        return () => {
            api.removeAllListeners('EditSprint')
            api.removeAllListeners('ChangeEventStatus')
        }
    }, [])

    const changeStatus = (e) => {
        // console.log(sprint)
        if(e.target.value !== '') api.send('EditSprint', {...sprint, status: e.target.value})
    }
    
    const changeEventStatus = (id) => {
        api.send('ChangeEventStatus', id)
    }

    const onDelete = (id) => {
        console.log('delete')
    }
    
    const push = (where) => history.push(where);

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
                                className={`select-chip chip-${sprint?.status.replace(/\s/g,'')}`}>
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
                                    onClick={()=>{push(`/sprints/${sprint._id}`)}}>
                                        Edit
                                </Button>
                                <Button
                                    style={{ flex:1}}
                                    onClick={()=>onDelete(sprint._id)}
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
                        <div className="events-list">
                            {sprint?.events?.length === 0 ? 
                                <div
                                    style={{
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                        alignContent: 'center', 
                                        width: '100%', 
                                        height: '100%', 
                                        color: 'rgba(255,255,255, .5)'}}>
                                           <em>No Events to show...</em> 
                                        </div> : ''}
                            {sprint?.events?.map((event, key)=>{
                                return <div className={`event-row ${event.status ? 'event-done' : ''}`} key={key}>
                                    <div className="row">
                                        <div className="short event-title">
                                            <span>{event.title}</span>
                                        </div>
                                        <div className="row">
                                            {moment(event?.start).format('YYYY MMM DD')}
                                        </div>
                                    </div>
                                    <div className="event-status">
                                        <SimpleCheckbox value={event.status} onClick={()=>changeEventStatus(event._id)}/>
                                    </div>
                                </div>
                            })}
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
                        color: 'rgba(255,255,255, .5)'}}>
                            Please Select a sprint...
                </div>}
            </>)
}

export default withRouter(ViewSprint)
