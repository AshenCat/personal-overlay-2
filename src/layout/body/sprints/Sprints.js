import moment from 'moment'
import React from 'react'
// import DateTime from 'react-datetime'
import DatePicker, { Calendar } from 'react-multi-date-picker'
import Button from '../../../components/button/Button'
import Card from '../../../components/card/Card'
import Input from '../../../components/input/inputText/Input'
import Textarea from '../../../components/input/textarea/Textarea'
import Select from '../../../components/select/Select'
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import './sprints.scss'
import { AutoSizer, List } from 'react-virtualized'
import Slider from '../../../components/checkbox/slider/Slider'


function Sprints(props) {
    
    const [people, setPeople] = React.useState([]);
    const [sprints, setSprints] = React.useState([])
    const [filteredSprints, setFilteredSprints] = React.useState([])
    const [sprintCount, setSprintCount] = React.useState(0)
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [events, setEvents] = React.useState([]);
    const [participants, setParticipants] = React.useState([]);
    const [dates, setDates] = React.useState('');
    const [filter, setFilter] = React.useState('')
    const [filterStatus, setFilterStatus] = React.useState('')
    // const [filterDates, setFilterDates] = React.useState('')
    const [filterAsc, setFilterAsc] = React.useState(false)

    const [openFilter, setOpenFilter] = React.useState(false)
    
    const onSubmit = () => {
        if (title.trim() === '' || description.trim() === '') return;
        const data = {
            title,
            description,
            events,
            participants,
            start: dates[0] ? moment(dates[0]).add('1','second').toDate() : null,
            end: dates[1] ? moment(dates[1]).add('1','second').toDate() : null,
        }
        api.send('onSprintAdd', data)
        setSprints(prev=>[data, ...prev])
        setFilteredSprints(prev=>[data, ...prev])
    }

    const onClear = () => {
        setTitle('')
        setDescription('')
        setEvents([])
        setParticipants([])
        setDates([])
    }

    const onDelete = (id) => {
        api.send('DeleteSprint', id)
        setSprints(prev=>prev.filter(pr=>pr._id!==id))
    }
    
    React.useEffect(()=>{
        // console.log(filterStatus)
        const val = sprints.filter(sprint => {
            if (filter === '') return true;
            if (sprint.title.toLowerCase().includes(filter) || sprint.description.toLowerCase().includes(filter)) return true;
            return false
        }).filter(sprint=>{
            if (filterStatus === '') return true;
            if (sprint.status === filterStatus) return true;
            return false;
        })
        setFilteredSprints(shouldAscend(val))
        setSprintCount(val.length)
    }, [filter, sprints, filterStatus, filterAsc])

    const shouldAscend = (arr) => {
        if(filterAsc) return [...arr].reverse();
        return arr;
    }

    React.useEffect(()=>{
        api.send('LoadSprints', {})
        api.recieve('LoadSprints', (data) => {
            console.log(data);
            setSprints([...data]);
            setFilteredSprints([...data])
            setSprintCount(data.length)
        })
        api.recieve('onSprintAdd', data => {
            console.log(data)
        })
        api.recieve('DeleteSprint', data => {
            console.log(data)
        })
        return () => {
            api.removeAllListeners('LoadSprints')
            api.removeAllListeners('onSprintAdd')
        }
    }, [])

    const RowCard = (propsies) => {
        const {
            index,
            key,
            style
        } = propsies;
        const eventsCount = data?.events?.length + 1;
        const data = filteredSprints[index]
        const width = propsies?.parent?.props?.width;
        if (data) return  <div key={key} className="sprint" style={style}>
                    <div className="sprint-card">
                        <div className="card-optional-calendar">
                            <Calendar 
                                // fixRelativePosition={'center'}
                                className="bg-dark"
                                showOtherDays={true}
                                zIndex={99}
                                value={[data?.start, data?.end]} 
                                range
                                readOnly
                                onChange={()=>{}}
                                plugins={width > 700 ? width > 850 ? [<DatePanel />, <TimePicker />] :[<DatePanel />] : []} 
                                />
                                {/* <Calendar value={value} onChange={() => setValue({})} /> */}
                        </div>
                        <div className="sprint-card-body">
                            <div className="card-title space-between">
                                Title: <h4>{data?.title ?? <em>No title??</em>}</h4>
                            </div>
                            <div className="card-events-count space-between">
                                Events: {eventsCount > 1 ? <span>{eventsCount}</span> : <em>No Events</em>}
                            </div>
                            <div className="card-events-count space-between">
                                Status: <em>{data?.status}</em>
                            </div>
                            <div className="card-description">
                                Description: {<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "<em>{data?.description}</em>"</span> ?? <em>No Description</em>}
                            </div>
                            <div className="card-actions">
                                <Button 
                                    style={{ padding: '8px'}}
                                    className="view-btn"
                                    onClick={()=>{props.history.push(`/sprint`)}}>
                                        Set Sprint
                                </Button>
                                <Button 
                                    style={{ padding: '8px'}}
                                    className="edit-btn"
                                    onClick={()=>{props.history.push(`/sprints/${data._id}`)}}>
                                        Edit
                                </Button>
                                <Button
                                    onClick={()=>onDelete(data._id)}
                                    className="danger-btn">
                                        Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
    }
    
    return (
        <div className="sprints">
            <div className="sprint-filter-and-settings">
                <h1>Sprints</h1>
                <Card className="sprint-menu" onButtonClick={()=>setOpenFilter(prev=>!prev)} isOpen={!openFilter}>
                    <h4 className="card-title">Add Sprint</h4>
                    <div className={`form-body ${!openFilter ? "" : "hide-body"}`}>
                        <div className="form-group">
                            <label>Title:</label>
                            <Input 
                                className="cWidth" 
                                placeholder="Enter title" 
                                value={title}
                                onChange={e=>setTitle(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Date:</label>
                            <DatePicker 
                                type="input-icon"
                                value={dates} 
                                onChange={dates=>setDates(dates.map(date=>date.toString()))}
                                placeholder="Optional"
                                inputClass="datetime-input"
                                zIndex={101}
                                // multiple
                                range
                                plugins={[<DatePanel />,]}/> 
                        </div>
                        {/* <div className="form-group">
                            <label>Participants:</label>
                            <Select 
                                className="cWidth">
                                <option style={{color: 'black'}}>-----</option>
                                {people.map((person, ctr) =>{
                                    return <option style={{color: 'black'}} key={ctr}>{person?.name}</option>
                                })}
                            </Select>
                        </div> */}
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
                <Card className="sprint-filter" onButtonClick={()=>setOpenFilter(prev=>!prev)} isOpen={openFilter}>
                    <h4 className="card-title">Sprints Filter</h4>
                    <div className={`card-body ${openFilter ? "" : "hide-body"}`}>
                        <div className="form-group">
                            <label>Search:</label>
                            <Input 
                                className="cWidth" 
                                placeholder="Search" 
                                value={filter}
                                onChange={(e)=>setFilter(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Status: </label>
                            <Select
                                onChange={(e)=>{
                                    setFilterStatus(e.target.value)
                                    // console.log(filterStatus)
                                }}
                                value={filterStatus}
                                className="cWidth">
                                <option style={{color: 'black'}} value="">-----</option>
                                <option style={{color: 'black'}} value="active">Active</option>
                                <option style={{color: 'black'}} value="done">Done</option>
                                <option style={{color: 'black'}} value="waiting">Waiting</option>
                                <option style={{color: 'black'}} value="on hold">On Hold</option>
                            </Select>
                        </div>
                        <div className="form-group">
                            <label>Ascending: </label>
                            <Slider id="ascending" name="ascending" value={filterAsc} onClick={()=>setFilterAsc(prev=>!prev)} />
                        </div>
                        {/* <div className="form-group" style={{flexFlow:"column", alignItems: "flex-start"}}>
                            <label>Date: </label>
                            <Calendar 
                                // fixRelativePosition={'center'}
                                className="bg-dark"
                                showOtherDays={true}
                                zIndex={99}
                                // value={[data?.start, data?.end]} 
                                range
                                readOnly
                                onChange={()=>{}} 
                                // plugins={[<DatePanel position="bottom"/>]}
                                />
                        </div> */}
                    </div>
                </Card>
            </div>
            <div className="sprints-container">
                <AutoSizer>
                    {({width, height})=> {
                        return <List 
                            height={height}
                            width={width}
                            overscanRowCount={2}
                            rowHeight={330}
                            rowCount={sprintCount}
                            rowRenderer={RowCard}
                            />
                    }}
                </AutoSizer>
            </div>
        </div>
    )
}

export default Sprints
