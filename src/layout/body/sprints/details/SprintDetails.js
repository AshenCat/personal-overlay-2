import React from 'react'
import { Calendar } from 'react-multi-date-picker';
import { withRouter } from 'react-router'
import Card from '../../../../components/card/Card';
import Input from '../../../../components/input/inputText/Input';
import Textarea from '../../../../components/input/textarea/Textarea';
import Button from '../../../../components/button/Button'
import Select from '../../../../components/select/Select'
import './SprintDetails.scss'

function SprintDetails(props) {
    const {location} = props;

    const [sprint, setSprint] = React.useState({
        title: '',
        description: '',
        start: '',
        end: '',
        status: '',
        events: [],
        participants: []
    });


    // const [title, setTitle] = React.useState('');
    // const [description, setDescription] = React.useState('');
    // const [start, setStart] = React.useState('');
    // const [end, setEnd] = React.useState('');
    // const [status, setStatus] = React.useState('');
    // const [events, setEvents] = React.useState([]);
    // const [participants, setParticipants] = React.useState([]);

    React.useEffect(()=>{
        const arr = location.pathname.split('/')
        api.send('LoadSprint', arr[arr.length-1])
        api.recieve('LoadSprint', (data) => {
            setSprint(data);
            console.log(data)
            // setTitle(data.title)
            // setDescription(data.description)
            // setStart(data.start)
            // setEnd(data.end)
            // setStatus(data.status)
            // setEvents(data.events)
            // setParticipants(data.participants)
        })
        // api.receive()
        return () => {
            api.removeAllListeners('LoadSprint')
        }
    }, [])

    const onSubmit = () => {
        console.log(sprint)
    }

    const DisplayListOf = (props) => {
        // console.log(props)
        if(props?.type?.length !== 0) {
            return props?.type?.map(sub => <div className="display-container">
                <div className="display-title">{sub.title}</div>
                <div className="display-start">{sub.start} - {sub.end}</div>
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
                                <Select style={{width: "50%"}} defaultValue={status} onChange={e=>setSprint(prev=>{ return {...prev, status: e.target.value}})}>
                                    <option style={{color: 'black'}} value=""></option>
                                    <option style={{color: 'black'}} value="waiting">Waiting</option>
                                    <option style={{color: 'black'}} value="active">Active</option>
                                    <option style={{color: 'black'}} value="on hold">On Hold</option>
                                    <option style={{color: 'black'}} value="done">Done</option>
                                </Select>
                            </div>
                            <div className="input-group" style={{flexFlow: 'column'}}>
                                <label>Description: </label>
                                <Textarea
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
                                            setSprint(prev=>{ return {...prev, start: date[0]?.toString(), end: date[1]?.toString()}})
                                            // console.log(date[1]?.toString())
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
                                    <label>Events: </label>
                                    <Button className="add-btn">Add Event</Button>
                                </div>
                                <div className="events-list">
                                    <DisplayListOf type={sprint?.events} str={"events"} />
                                </div>
                            </div>
                            <div className="participants">
                                <div className="participants-head">
                                    <label>Participants: </label>
                                    <Button className="add-btn">Add Participant</Button>
                                </div>
                                <div className="participants-list">
                                    <DisplayListOf type={sprint?.participants} str={"participants"} />
                                </div>
                            </div>
                            <div className="card-actions">
                                <Button
                                    onClick={onSubmit}>
                                    Save
                                </Button>
                                <Button
                                    className="cancel-btn"
                                    onClick={()=>props.history.goBack()}>
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
