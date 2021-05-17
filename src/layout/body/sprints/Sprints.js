import moment from 'moment'
import React from 'react'
import DateTime from 'react-datetime'
import Button from '../../../components/button/Button'
import Card from '../../../components/card/Card'
import Input from '../../../components/input/inputText/Input'
import Textarea from '../../../components/input/textarea/Textarea'
import Select from '../../../components/select/select'
import './sprints.scss'

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';

function Sprints(props) {
    
    const [people, setPeople] = React.useState([]);
    const [sprints, setSprints] = React.useState([])
    const [filteredSprints, setFilteredSprints] = React.useState([])
    // const [sprintCount, setSprintCount] = React.useState(0)
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [events, setEvents] = React.useState([]);
    const [participants, setParticipants] = React.useState([]);
    const [start, setStart] = React.useState('');
    const [end, setEnd] = React.useState('');
    const [filter, setFilter] = React.useState('')
    
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

    // const filteredSprintsResult = () => {
        // const result =  sprints.filter(sprint => {
        //     if (filter === '') return true;
        //     if (sprint.title.includes(filter) || sprint.description.includes(filter)) return true;
        //     return false
        // })
    //     console.log(result)
    //     setSprintCount(result.length)
    //     return result
    // }

    const rowRenderer = (propsies) => {
        const {
            key,
            index, 
            style
        } = propsies;
        // console.log(propsies)
        const sprint = filteredSprints[index]
        const eventsCount = sprint?.events?.length + 1;
        // console.log(sprint)
        return  <div key={key} className="sprint" style={style}>
                    <div className="sprint-card">
                        <div className="labels">
                            <div>Sprint name:</div>
                            <div>Events: </div>
                            <div>Description:</div>
                        </div>
                        <div className="sprint-card-body">
                            <div className="card-title">
                                <h5>{sprint?.title ?? <em>No title??</em>}</h5>
                            </div>
                            <div className="card-events-count">
                                {eventsCount > 1 ? eventsCount : <em>No Events</em>}
                            </div>
                            <div className="card-description">
                                {sprint?.description ?? <em>No Description</em>}
                            </div>
                        </div>
                    </div>
                </div>
    }

    React.useEffect(()=>{
        const val = sprints.filter(sprint => {
            if (filter === '') return true;
            if (sprint.title.includes(filter) || sprint.description.includes(filter)) return true;
            return false
        })
        setFilteredSprints(val)
        console.log(val)
    }, [filter])

    React.useEffect(()=>{
        api.send('LoadSprints', {})
        api.recieve('LoadSprints', (data) => {
            console.log([...data]);
            setSprints([...data]);
            setFilteredSprints([...data])
            // setSprintCount(data.length)
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
                            <Input 
                                className="cWidth" 
                                placeholder="Search" 
                                value={filter}
                                onChange={(e)=>setFilter(e.target.value)}/>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="sprints-container">
                <AutoSizer>
                    {({height, width}) => {
                        // console.log(height)
                        return <List
                            height={height}
                            width={width}
                            overscanRowCount={5}
                            rowCount={filteredSprints.length}
                            rowRenderer={rowRenderer}
                            rowHeight={120}
                        />
                    }}
                </AutoSizer>
            </div>
        </div>
    )
}

export default Sprints
