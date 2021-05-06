import FullCalendar from '@fullcalendar/react';
import React from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"

import { useEventModalContext } from '../../../context/EventModal/EventModalContext';

import './home.scss'
import Button from '../../../components/button/Button';

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

    const handleEventAdd = async (data) => {
        console.log(data)
        return undefined;
    }

    const displayEvents = () => {
        return (
            <div></div>
        )
    }

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
                        // selectable={true}
                        // select={handleSelect}
                        // editable={true}
                        // drop={(info)=> {
                        //     console.log(info)
                        // }}
                        />
                </div>
            </div>
        </div>
    )
}

export default Home