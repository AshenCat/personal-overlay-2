import moment from 'moment'
import React from 'react'
import DateTime from 'react-datetime'
import Button from '../../../components/button/Button'
import Card from '../../../components/card/Card'
import Input from '../../../components/input/inputText/Input'
import Textarea from '../../../components/input/textarea/Textarea'
import Select from '../../../components/select/select'
import './sprints.scss'

function Sprints(props) {
    
    const [people, setPeople] = React.useState([]);
    const [sprints, setSprints] = React.useState([])
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [events, setEvents] = React.useState([]);
    const [participants, setParticipants] = React.useState([]);
    const [start, setStart] = React.useState('');
    const [end, setEnd] = React.useState('');
    
    const onSubmit = () => {
        const data = {
            title,
            description,
            events,
            participants,
            start: start ? moment(start).add('1','second').toDate() : null,
            end: end ? moment(end).add('1','second').toDate() : null,
        }
        api.send('onSprintAdd', data)
        setSprints(prev=>[...prev, data])
    }

    const onClear = () => {
        setTitle('')
        setDescription('')
        setEvents([])
        setParticipants([])
        setStart('')
        setEnd('')
    }

    React.useEffect(()=>{
        api.send('LoadSprints', {})
        api.recieve('LoadSprints', (data) => {
            console.log(data);
            setSprints([...data]);
        })
        // api.recieve('onSprintAdd', data => {
        //     console.log(data)
        //     setSprints(prev=>[...prev, data.data])
        // })
        return () => {
            api.removeAllListeners('LoadSprints')
            api.removeAllListeners('onSprintAdd')
        }
    }, [])
    
    return (
        <div className="sprints">
            <div className="sprint-filter-and-settings">
                <Card className="sprint-menu" noButton>
                    <h4 className="card-title">Add Sprint</h4>
                    <div className="form-body">
                        <div className="form-group">
                            <label>Title:</label>
                            <Input 
                                className="cWidth" 
                                placeholder="Enter title" 
                                value={title}
                                onChange={e=>setTitle(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>From:</label>
                            <DateTime 
                                value={start}
                                onChange={(date)=>setStart(date)}
                                className="datetime-input-container"
                                inputProps={{
                                    className: "datetime-input",
                                    placeholder: 'optional'
                                }}
                                renderInput={(props) => {
                                    return <input {...props} value={(start) ? props.value : ''} />
                                }}/>
                        </div>
                        <div className="form-group">
                            <label>To:</label>
                            <DateTime 
                                value={end}
                                onChange={(date)=>setEnd(date)}
                                className="datetime-input-container"
                                inputProps={{
                                    className: "datetime-input",
                                    placeholder: 'optional'
                                }}
                                renderInput={(props) => {
                                    return <input {...props} value={(end) ? props.value : ''} />
                                }}/>
                        </div>
                        <div className="form-group">
                            <label>Participants:</label>
                            <Select 
                                className="cWidth">
                                <option style={{color: 'black'}}>-----</option>
                                {people.map((person, ctr) =>{
                                    return <option style={{color: 'black'}} key={ctr}>{person?.name}</option>
                                })}
                            </Select>
                        </div>
                        <div className="form-group" style={{flexDirection: 'column', alignItems: 'unset'}}>
                            <label>Description: </label>
                            <Textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Enter Description" />
                        </div> 
                        <div className="form-group">
                            <Button 
                                style={{width: '78%', marginTop: '8px'}}
                                onClick={onSubmit}>
                                    Submit
                            </Button>
                            <Button 
                                style={{width: '20%', marginTop: '8px', backgroundColor: '#ccc', color: 'black'}}
                                onClick={onClear}>
                                    Clear
                            </Button>
                        </div>
                    </div>
                </Card>
                <Card className="sprint-filter" noButton>
                    <h4 className="card-title">Sprints Filter</h4>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Search:</label>
                            <Input className="cWidth" placeholder="Search" />
                        </div>
                    </div>
                </Card>
            </div>
            <div className="sprints-container">
                {sprints.map((sprint, ctr) => {
                    return <Card key={ctr} className="sprint">
                        <div className="card-title">
                            <h5>{sprint?.title}</h5>
                        </div>
                        <div className="card-body">

                        </div>
                        <div className="card-actions"></div>
                    </Card>
                })}
            </div>
        </div>
    )
}

export default Sprints
