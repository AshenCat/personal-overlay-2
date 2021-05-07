import FullCalendar from '@fullcalendar/react';
import React from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"

import { useEventModalContext } from '../../../context/EventModal/EventModalContext';

import './home.scss'
import Button from '../../../components/button/Button';
import moment from 'moment';

function Home() {
    const calendarRef = React.useRef(null);
    const [events, setEvents] = React.useState([]); 

    const {setEventModalOpen, setCalendarRef, setStart, setEnd} = useEventModalContext();

    const handleDateClick = (info) => {
        // console.log(info)
        setStart(info.date)
        setEnd(info.date)
        setCalendarRef(calendarRef);
        setEventModalOpen(true);
    }

    const handleEventAdd = (data) => {
        // console.log('eventAdd')
        // console.log(data.event.toJSON())
        api.send('onEventAdd', data.event.toJSON())
    }

    const handleDateSet = (data) => {
        // load events on start;; moment(data.start).toISOstring()
    }

    const displayEvents = () => {
        return (
            <div></div>
        )
    }

    React.useEffect(() => {
        // console.log(moment().add('-1','month').toDate())
        api.send('LoadCalendarEvents', {
            monthBefore: moment().add('-1','month').toDate(),
            current: calendarRef.current.getApi().getDate(),
            monthAfter: moment().add('1','month').toDate(),
        });
    }, [])

    React.useEffect(() => {
        api.recieve('onEventAdd', (msg)=>{
            console.log('from Home.js: ', msg)
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
                <div className="unassigned-events">
                    <h4>Draggable Events</h4>
                    <Button>Add Set</Button>
                </div>
            </div>
            <div className="calendar">
                <div className="calendar-container">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        eventAdd={event => handleEventAdd(event)}
                        dateClick={handleDateClick}
                        headerToolbar={{
                            left: 'prev,next today',
                            center:'title',
                            right: 'dayGridMonth,dayGridWeek,dayGridDay',
                        }}
                        dayMaxEventRows={2}
                        //events
                        events={events}
                        // selectable={true}
                        // select={handleSelect}
                        // editable={true}
                        // drop={(info)=> {
                        //     console.log(info)
                        // }}
                        // dateSet={date=>{handleDetSet(date)}}
                        />
                </div>
            </div>
        </div>
    )
}

export default Home