import moment from 'moment'
import React from 'react'
// import DateTime from 'react-datetime'
import DatePicker, { Calendar } from 'react-multi-date-picker'
import Button from '../../../components/button/Button'
import Card from '../../../components/card/Card'
import Input from '../../../components/input/inputText/Input'
import Textarea from '../../../components/input/textarea/Textarea'
import Select from '../../../components/select/select'
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import './sprints.scss'
import { AutoSizer, List } from 'react-virtualized'

function Sprints(props) {
    
    const [people, setPeople] = React.useState([]);
    const [sprints, setSprints] = React.useState([])
    const [filteredSprints, setFilteredSprints] = React.useState([])
    const [sprintCount, setSprintCount] = React.useState(0)
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [events, setEvents] = React.useState([]);
    const [participants, setParticipants] = React.useState([]);
    // const [start, setStart] = React.useState('');
    // const [end, setEnd] = React.useState('');
    const [dates, setDates] = React.useState('');
    const [filter, setFilter] = React.useState('')
    
    const onSubmit = () => {
        const data = {
            title,
            description,
            events,
            participants,
            start: dates[0] ? moment(dates[0]).add('1','second').toDate() : null,
            end: dates[1] ? moment(dates[1]).add('1','second').toDate() : null,
        }
        api.send('onSprintAdd', data)
        setSprints(prev=>[...prev, data])
    }

    const onClear = () => {
        setTitle('')
        setDescription('')
        setEvents([])
        setParticipants([])
        setDates([])
        // setStart('')
        // setEnd('')
    }

    // const filteredSprintsResult = () => {
    //     const result =  sprints.filter(sprint => {
    //         if (filter === '') return true;
    //         if (sprint.title.includes(filter) || sprint.description.includes(filter)) return true;
    //         return false
    //     })
    //     console.log(result)
    //     setSprintCount(result.length)
    //     return result
    // }

    const RowCard = (propsies) => {
        const {
            index,
            key,
            style
        } = propsies;
        // console.log(propsies)
        const eventsCount = data?.events?.length + 1;
        const data = filteredSprints[index]
        const width = propsies?.parent?.props?.width;
        // console.log(sprint)
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
                            <div className="card-events-count space-between mt-10px">
                                Events: {eventsCount > 1 ? <span>{eventsCount}</span> : <em>No Events</em>}
                            </div>
                            <div className="card-description mt-10px">
                                Description: {<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "<em>{data?.description}</em>"</span> ?? <em>No Description</em>}
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
        setSprintCount(val.length)
        // console.log(val.length)
    }, [filter])

    React.useEffect(()=>{
        api.send('LoadSprints', {})
        api.recieve('LoadSprints', (data) => {
            // console.log([...data]);
            setSprints([...data]);
            setFilteredSprints([...data])
            setSprintCount(data.length)
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
                            <label>Date Range:</label>
                            {/* <DateTime 
                                value={start}
                                onChange={(date)=>setStart(date)}
                                className="datetime-input-container"
                                inputProps={{
                                    className: "datetime-input",
                                    placeholder: 'optional'
                                }}
                                renderInput={(props) => {
                                    return <input {...props} value={(start) ? props.value : ''} />
                                }}/> */}
                            <DatePicker 
                                type="input-icon"
                                value={dates} 
                                onChange={dates=>{
                                    console.log(dates)
                                    setDates(dates)
                                }}
                                placeholder="Optional"
                                inputClass="datetime-input"
                                zIndex={101}
                                // multiple
                                range
                                plugins={[<DatePanel />,]}/> 
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
