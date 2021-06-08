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
import Input from '../../../components/input/inputText/Input';
import Select from '../../../components/select/Select';
import ClickMenu from '../../../components/clickMenu/ClickMenu';
import Card from '../../../components/card/Card';
import Slider from '../../../components/checkbox/slider/Slider';
import { withRouter } from 'react-router';

function Home(props) {
    const calendarRef = React.useRef(null);
    const [events, setEvents] = React.useState([]);
    const [dataType, setDataType] = React.useState('sprints');
    const [selectable, setSelectable] = React.useState(false);
    const [editable, setEditable] = React.useState(false);
    // const [sprintFilter, setSprintFilter] = React.useState('')
    const [search, setSearch] = React.useState('')
    const [mouse, setMouse] = React.useState(null)
    const [dateClickData, setDateClickData] = React.useState(null)
    const [openClickMenu, setOpenClickMenu] = React.useState(false)

    const [openFilter, setOpenFilter] = React.useState(true)
    // const [eventsVisible, setEventsVisible] = React.useState(2)
    // const [viewDate, setViewDate] = React.useState(moment())

    const {setEventModalOpen, setCalendarRef, setDates} = useEventModalContext();

    const handleDateClick = (info) => {
        // console.log(dateClickData)
        // setDates([info.date ?? moment(info.startStr), info.date ?? moment(info.endStr).subtract(1, 'second')])
        setDates(info.date ?? moment(info.startStr))
        setCalendarRef(calendarRef);
        setEventModalOpen(true);
    }

    // const handleSelect = (info) => {
    //     console.log(info)
    //     setMouse({x:info.jsEvent.clientX, y:info.jsEvent.y})
    //     setStart(moment(info.startStr));
    //     setEnd(moment(info.endStr));
    //     setCalendarRef(calendarRef);
    //     setOpenClickMenu(true)
    //     // setEventModalOpen(true);
    // }

    const handleEventAdd = (data) => {
        // console.log(data.event.toPlainObject())
        // calendarRef.current.getApi().getEvents().slice(0, -1)
        data.revert()
        const date = {
            ...data.event.toPlainObject(),
            start: moment(data.event.toPlainObject().start).format('YYYY-MM-DD HH:mm:ss'),
            // end: data.event.toPlainObject().end ? moment(data.event.toPlainObject().end).format('YYYY-MM-DD HH:mm:ss') : null,
            // description: data.event.extendedProps.description,
            allDay: data.event.allDay
        }
        api.send('onEventAdd', date)
    }

    const handleDatesSet = (data) => {
        // console.log(data)
        // api.send('LoadCalendarData', {
        //     monthStart: data.startStr,
        //     monthEnd: data.endStr,
        //     ofType: dataType,
        // });
    }

    const clickMenuItems = () => {
        if (dataType === 'events') {
            return (
                <>
                <div onClick={()=>{
                    handleDateClick(dateClickData)
                    setOpenClickMenu(false)
                    // setEventModalOpen(true)
                }}>
                    Add event
                </div>
                <div onClick={()=>{
                    // console.log(dateClickData)
                    calendarRef.current.getApi().changeView('dayGridDay', moment(dateClickData.dateStr).format('YYYY-MM-DD'))
                    setOpenClickMenu(false)
                }}>
                    Check Date
                </div>
                </>
            )
        }
        else {
            return <>
                <div onClick={()=>{
                    setOpenClickMenu(false)
                    // console.log(dateClickData)
                    props.history.push(`/sprints?date=${dateClickData.dateStr}`)
                }}>
                    Add Sprint
                </div>
                <div onClick={()=>{
                    // console.log(dateClickData)
                    calendarRef.current.getApi().changeView('dayGridDay', moment(dateClickData.dateStr).format('YYYY-MM-DD'))
                    setOpenClickMenu(false)
                }}>
                    Check Day
                </div>
            </>
        }
    }

    React.useEffect(() => {
        api.recieve('onEventAdd', (msg)=>{
            // console.log()
            api.send('LoadCalendarData', {
                monthStart: moment().clone().startOf('month').subtract(1,'week').format('YYYY-MM-DD hh:mm'),
                monthEnd: moment().clone().endOf('month').add(1,'week').format('YYYY-MM-DD hh:mm'),
                ofType: dataType,
            });
        })
        api.recieve('LoadCalendarData', (data) => {
            setEvents([...data])
            // console.log('loading')
            console.log([...data])
        })
        
        api.send('LoadCalendarData', {
            monthStart: moment().clone().startOf('month').subtract(1,'week').format('YYYY-MM-DD hh:mm'),
            monthEnd: moment().clone().endOf('month').add(1,'week').format('YYYY-MM-DD hh:mm'),
            ofType: dataType,
        });
    
        return () => {
            api.removeAllListeners('onEventAdd')
            api.removeAllListeners('LoadCalendarData')
        }
    }, [dataType])

    return (
        <div className="home">
            <div className="events-section">
                {<h1 style={{textTransform:"capitalize"}}>{dataType}</h1>}
                <Card onButtonClick={()=>setOpenFilter(prev=>!prev)} isOpen={openFilter}>
                    <h4 className="card-title">Filter and settings</h4>
                    <div className={`filter-and-settings ${openFilter ? 'show-card' : ''}`}>
                        <div className="row space-between m-5px">
                            <label htmlFor="eventsearch">Search:</label>
                            <Input placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} style={{width: '50%'}}/>
                        </div>
                        {/* <div className="row space-between m-1px">
                            <label htmlFor="ids" style={{marginTop: '4px'}}>Group filter: </label>
                            <Select name="ids" id="ids" 
                            defaultValue={sprintFilter} 
                            onChange={e=>setSprintFilter(e.target.value)} 
                            style={{width: '50%', marginTop: '3px'}}>
                                <option value=''>-----</option>
                                {events.map((event, ctr) => {
                                    if(event.groupId) return <option value={event.groupId} key={ctr}>{event.groupId}</option>
                                    return null;
                                })}
                            </Select>
                        </div> */}
                        <div className="row space-between m-1px">
                            <label htmlFor="ids" style={{marginTop: '4px'}}>Data: </label>
                            <Select name="data" id="data" 
                                value={dataType} 
                                onChange={e=>setDataType(e.target.value)} 
                                style={{width: '50%', marginTop: '3px'}}>
                                {/* <option value=''>-----</option> */}
                                <option value='sprints'>Sprints</option>
                                <option value='events'>Events</option>
                            </Select>
                        </div>
                        <div className="row m-1px">
                            <div className="labels">
                                <label htmlFor="selectable">Selectable: </label>
                                <label htmlFor="editable">Editable: </label>
                            </div>
                            <div className="switches">
                                <Slider name="selectable" id="selectable" value={selectable} onClick={()=>setSelectable(prev=>!prev)} />
                                <Slider name="editable" id="editable" value={editable} onClick={()=>setEditable(prev=>!prev)} />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="calendar">
                <div className="calendar-container">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        eventAdd={event => handleEventAdd(event)}
                        dateClick={(info)=>{
                            // console.log(moment(info.date).format('MM-DD-YYYY'))
                            setMouse({x:info.jsEvent.clientX, y:info.jsEvent.y})
                            setDateClickData(info)
                            setOpenClickMenu(true)
                        }}
                        headerToolbar={{
                            left: 'prev,next today',
                            center:'title',
                            right: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek',
                        }}
                        dayMaxEventRows={true}
                        datesSet={handleDatesSet}
                        defaultAllDay={true}
                        //events
                        events={
                            events.filter(event => {
                                if (search !== '') {
                                    if (event.groupId?.includes(search)) return true;
                                    if (event.title?.includes(search)) return true;
                                    return false
                                }
                                return true
                        })}
                        selectable={selectable}
                        select={(info)=>{
                            // console.log(moment(info.date).format('MM-DD-YYYY'))
                            setMouse({x:info.jsEvent.clientX, y:info.jsEvent.clientY})
                            setDateClickData(info)
                            setOpenClickMenu(true)
                        }}
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
                <ClickMenu 
                    y={mouse?.y}
                    x={mouse?.x}
                    openClickMenu={openClickMenu}
                    setOpenClickMenu={setOpenClickMenu}>
                    {clickMenuItems()}
                </ClickMenu>
            </div>
        </div>
    )
}

export default withRouter(Home)