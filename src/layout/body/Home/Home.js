import FullCalendar from '@fullcalendar/react';
import React from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction"
import moment from "moment";

import { useEventModalContext } from '../../../context/EventModal/EventModalContext';

import './home.scss'
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';

function Home() {
    const calendarRef = React.useRef(null);
    const [events, setEvents] = React.useState([]);
    const [selectable, setSelectable] = React.useState(false);
    const [editable, setEditable] = React.useState(false);
    const [sprintFilter, setSprintFilter] = React.useState('')
    const [search, setSearch] = React.useState('')
    // const [eventsVisible, setEventsVisible] = React.useState(2)
    // const [viewDate, setViewDate] = React.useState(moment())

    const {setEventModalOpen, setCalendarRef, setStart, setEnd} = useEventModalContext();

    const handleDateClick = (info) => {
        // console.log(info)
        setStart(info.date)
        setEnd(info.date)
        setCalendarRef(calendarRef);
        setEventModalOpen(true);
    }

    const handleSelect = (data) => {
        // console.log(data)
        setStart(moment(data.startStr));
        setEnd(moment(data.endStr));
        setCalendarRef(calendarRef);
        setEventModalOpen(true);
    }

    const handleEventAdd = (data) => {
        // console.log(data.event.toPlainObject())
        const date = {
            ...data.event.toPlainObject(),
            start: moment(data.event.toPlainObject().start).add('1','second').format('YYYY-MM-DD HH:mm:ss')
        }
        console.log(date)
        api.send('onEventAdd', date)
    }

    const handleDatesSet = (data) => {
        // console.log(data)
        api.send('LoadCalendarEvents', {
            monthStart: data.startStr,
            monthEnd: data.endStr,
        });
    }

    const displayEvents = () => {
        return (
            <div></div>
        )
    }

    React.useEffect(() => {
        api.recieve('onEventAdd', (msg)=>{
            // console.log('from Home.js: ', msg)
        })
        api.recieve('LoadCalendarEvents', (data) => {
            setEvents([...data])
            // console.log('loading')
            console.log([...data])
        })
        return () => {
            api.removeAllListeners('onEventAdded')
        }
    }, [])

    return (
        <div className="home">
            <div className="events-section">
                <div className="events-filter m-3px">
                    <h4>Filter and settings</h4>
                    <div className="filter-and-settings">
                        <div className="row space-between m-3px">
                            <label htmlFor="eventsearch">Event Search:</label>
                            <Input placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} style={{width: '50%'}}/>
                        </div>
                        <div className="row space-between m-3px">
                            <label htmlFor="ids">Group filter: </label>
                            <select name="ids" id="ids" defaultValue={sprintFilter} onChange={e=>setSprintFilter(e.target.value)} style={{width: '50%'}}>
                                <option value=''>-----</option>
                                {events.map((event, ctr) => {
                                    if(event.groupId) return <option value={event.groupId} key={ctr}>{event.groupId}</option>
                                    return null;
                                })}
                            </select>
                        </div>
                        <div className="row m-3px">
                            <div className="labels">
                                <label htmlFor="selectable">Selectable: </label>
                                <label htmlFor="editable m-3px">Editable: </label>
                            </div>
                            <div className="switches">
                                <label className="switch">
                                    <input type="checkbox" name="selectable" id="selectable" value={selectable} />
                                    <span className="round-slider" onClick={()=>setSelectable(prevState=>!prevState)}></span>
                                </label>
                                <label className="switch">
                                    <input type="checkbox" name="editable" id="editable" value={editable} />
                                    <span className="round-slider" onClick={()=>setEditable(prevState=>!prevState)}></span>
                                </label>
                            </div>
                        </div>
                        {/* <div className="row space-between m-3px">
                            <label htmlFor="eventsearch">Events Visible:</label>
                            <select 
                                name="maxVisibleEvents" id="maxVisibleEvents" 
                                defaultValue={eventsVisible} style={{width: '25%'}}
                                onChange={e=>setEventsVisible(parseInt(e.target.value))}
                                className="">
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>
                        </div> */}
                    </div>
                </div>
                <div className="unassigned-events m-3px">
                    <h4>Draggable Events</h4>
                    <Button>Add Set</Button>
                </div>
            </div>
            <div className="calendar">
                <div className="calendar-container">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        eventAdd={event => handleEventAdd(event)}
                        dateClick={handleDateClick}
                        headerToolbar={{
                            left: 'prev,next today',
                            center:'title',
                            right: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek',
                        }}
                        dayMaxEventRows={true}
                        datesSet={handleDatesSet}
                        defaultAllDay={true}
                        //events
                        events={events}
                        selectable={selectable}
                        select={handleSelect}
                        editable={editable}
                        droppable={true}
                        // drop={(info)=> {
                        //     console.log(info)
                        // }}
                        eventResize={(data)=>{
                            console.log(data)
                        }}
                        // eventResizableFromStart={true}
                        />
                </div>
            </div>
        </div>
    )
}

export default Home