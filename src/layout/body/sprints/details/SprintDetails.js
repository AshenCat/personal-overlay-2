import React from 'react'
import { Calendar } from 'react-multi-date-picker';
import { withRouter } from 'react-router'
import Card from '../../../../components/card/Card';
import Input from '../../../../components/input/inputText/Input';
import Textarea from '../../../../components/input/textarea/Textarea';
import Button from '../../../../components/button/Button'
import Select from '../../../../components/select/Select'
import './SprintDetails.scss'
import { useEventModalContext } from '../../../../context/EventModal/EventModalContext';
import moment from 'moment';
import { DeleteOutline, RestoreFromTrash } from '@material-ui/icons';

function SprintDetails(props) {
    const {location} = props;

    // const [open, setOpen] = React.useState(false);
    const [sprint, setSprint] = React.useState({
        title: '',
        description: '',
        start: '',
        end: '',
        status: '',
        events: [],
        participants: []
    });
    const [OG, setOG] = React.useState(null);
    const [del, setDel] = React.useState([])
    
    const {setEventModalOpen, setCalendarRef, setDates} = useEventModalContext();

    React.useEffect(()=>{
        const arr = location.pathname.split('/')
        api.send('LoadSprint', arr[arr.length-1])
        api.recieve('LoadSprint', (data) => {
            setSprint(data);
            setOG(data);
            console.log(data);
        })
        // api.receive()
        return () => {
            api.removeAllListeners('LoadSprint')
        }
    }, [])

    const onEventDel = (key) => {
        console.log("deleting : ", key)
        console.log(sprint.events[key])
        setDel(prev => [...prev, 
            {
                event: sprint.events[key],
                index: key
            }])
        setSprint(prev=>{
            return {
                ...prev,
                events: [...prev.events.filter((ev)=>ev!=prev.events[key])]
            }
        })
    }

    const onEventUndo = () => {
        console.log(del)
        const lastStackItem =del[del.length - 1];
        setSprint(prev => {
            return {
                ...prev,
                events: [...prev.events.slice(0, lastStackItem.index), lastStackItem.event ,...prev.events.slice(lastStackItem.index)]
            }
        })
        setDel(prev => [...prev.filter(dl => dl.index !== lastStackItem.index)])
    }

    const onSubmit = () => {
        // console.log(sprint)
        if (OG !== sprint) {
            api.send('EditSprint', {
                ...sprint,
                del: [...del.filter(dl => !!dl.event._id).map(dl=>dl.event)]
            })
            // console.log(del)
            console.log({
                    ...sprint,
                    del: [...del.filter(dl=>!!dl.event._id).map(dl=>dl.event)]
                })
        }
    }

    const DisplayListOf = (props) => {
        // console.log(props?.type?.length !== 0)
        if(props?.type?.length !== 0 && props?.type?.length) {
            return props?.type?.map((sub, key) => <div className="display-container" key={key}>
                <div className="lower-display-container">
                    <div className="left">
                        <div className="display-title"><b>{sub?.title}</b></div>
                        <div className="display-date"><div>From:</div> <div>{moment(sub?.start).format('YYYY MMM DD HH:mm:ss')}</div></div>
                        {/* <div className="display-date"><div>To:</div> <div>{moment(sub?.end).format('YYYY MMM DD HH:mm:ss')}</div></div> */}
                    </div>
                    <div className="right">
                        {/* <Button>Edit</Button> */}
                        <Button 
                            className="danger-btn"
                            onClick={()=>onEventDel(key)}>
                                <DeleteOutline />
                        </Button>
                    </div>
                </div>
                {/* {sub?.start === sub?.end ? " - " + moment(sub?.end).format("YYYY, MMM DD hh:mm") : ""} </div> */}
            </div>)
        }
        return <em style={{alignSelf:'center', margin: '0 auto', color: 'rgba(255,255,255,.3)'}}>No {props?.str} to show...</em>
    }

    return (
        <article className="view-sprint">
                <Card 
                    className="card-sprint-details" 
                    noButton>
                    <h4 className="card-title">
                        Sprint Details
                    </h4>
                    <div className="card-body">
                        <div className="left">
                            <div className="input-group">
                                <label>Title: </label>
                                <Input value={sprint?.title} onChange={(e)=>setSprint(prev=>{ return {...prev, title: e.target.value}})} />
                            </div>
                            <div className="input-group" style={{justifyContent: "space-between"}}>
                                <label>Status: </label>
                                <Select style={{width: "50%"}} value={sprint?.status} onChange={e=>setSprint(prev=>{ return {...prev, status: e.target.value}})}>
                                    <option style={{color: 'black'}} value=""></option>
                                    <option style={{color: 'black'}} value="waiting">Waiting</option>
                                    <option style={{color: 'black'}} value="active">Active</option>
                                    <option style={{color: 'black'}} value="on hold">On Hold</option>
                                    <option style={{color: 'black'}} value="failed">Failed</option>
                                    <option style={{color: 'black'}} value="done">Done</option>
                                </Select>
                            </div>
                            <div className="input-group" style={{flexFlow: 'column'}}>
                                <label>Description: </label>
                                <Textarea
                                    className="textarea-sprint"
                                    value={sprint?.description} 
                                    onChange={e=>setSprint(prev=>{ return {...prev, description: e.target.value}})}
                                    />
                            </div>
                            <div className="input-group" style={{flexFlow: 'column'}}>
                                <label>Range:</label>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Calendar 
                                        value={[sprint?.start, sprint?.end]}
                                        onChange={date=>{
                                            // setSprint(prev=>{ return {...prev, start: moment(date[0].format('YYYY-MM-DD HH:MM')), end: date[1] ? moment(date[1].format('YYYY-MM-DD HH:MM')) : null}})
                                            setSprint(prev=>{ return {...prev, start: date[0]?.toString(), end: date[1]?.toString()}})
                                        }}
                                        range
                                        showOtherDays
                                        className="bg-dark"/>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="events">
                                <div className="events-head">
                                    <label style={{flex:1}}>Events: </label>
                                    
                                    <Button 
                                        onClick={()=>{
                                            setDates(moment(sprint.start).format('YYYY/MM/DD'))
                                            setCalendarRef({
                                                new: {
                                                    setSprint: (ev) =>{
                                                        setSprint(prev=>{ return {...prev, events: [...prev.events, ev]}})
                                                        // console.log(ev)
                                                    }
                                                }
                                            })
                                            setEventModalOpen(true)
                                        }}
                                        style={{height: '100%', padding: '0 15px'}}>
                                            Add Event
                                    </Button>
                                    <Button
                                        // className={del.length === 0 ? '' : "add-btn"}
                                        disabled={del.length === 0}
                                        style={{marginLeft: "5px", padding: '5px 10px 2px 10px', position: 'relative',
                                                backgroundColor: del.length===0 ? "gray": '#1177bb', cursor: del.length===0 ? "not-allowed" : 'pointer'}}
                                        onClick={onEventUndo}>
                                            <RestoreFromTrash />
                                    </Button>
                                </div>
                                <div className="events-list" style={sprint?.events?.length > 0 ? {flexFlow: 'column'} : {}}>
                                    <DisplayListOf type={sprint?.events} str={"events"} />
                                </div>
                            </div>
                            {/* <div className="participants">
                                <div className="participants-head">
                                    <label>Participants: </label>
                                    <Button className="add-btn">Add Participant</Button>
                                </div>
                                <div className="participants-list" style={sprint?.events?.length > 0 ? {flexFlow: 'column'} : {}}>
                                    <DisplayListOf type={sprint?.participants} str={"participants"} />
                                </div>
                            </div> */}
                            <div className="card-actions">
                                <Button
                                    onClick={onSubmit}>
                                    Save
                                </Button>
                                <Button
                                    className="cancel-btn"
                                    onClick={()=>{
                                        props.history.push('/sprints')
                                        console.log(sprint)
                                    }}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
        </article>
    )
}

export default withRouter(SprintDetails)
