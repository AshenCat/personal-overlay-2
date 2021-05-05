import FullCalendar from '@fullcalendar/react';
import React from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"

import { useEventModalContext } from '../../../context/EventModal/EventModalContext';

import './home.scss'

function Home() {
    const calendarRef = React.useRef(null);
    const {setEventModalOpen, setCalendarRef, setStart, setEnd} = useEventModalContext();

    const handleDateClick = (info) => {
        console.log(info)
        setStart(info.date)
        setEnd(info.date)
        setCalendarRef(calendarRef);
        setEventModalOpen(true);
    }

    const handleEventAdd = async (data) => {
        return undefined;
    }

    return (
        <div className="home">
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