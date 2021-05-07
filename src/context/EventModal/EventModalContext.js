import React from 'react'
import Button from '../../components/button/Button';
import './eventmodalcontext.scss'
import DateTime from 'react-datetime'
import moment from 'moment';
import Modal from '../../components/modal/Modal';

const EventModalContext = React.createContext();

export const useEventModalContext = () => {
    return React.useContext(EventModalContext);
}

/**
 * Hook that alerts clicks outside of the passed ref
 */

function EventModalProvider(props) {
    const [open, setEventModalOpen] = React.useState(false);

    const [title, setTitle] = React.useState("");
    const [start, setStart] = React.useState("");
    const [end, setEnd] = React.useState("");
    const [calendarRef, setCalendarRef] = React.useState({})

    const onSubmit = () => {
        if (title === "" || start === "" || end === "") return;
        if (moment(start).isAfter(end)) return;
        // if (start === end) return;
        calendarRef.current.getApi().addEvent({
            title, 
            start: moment(start).toDate(), 
            end: moment(end).toDate()
        });
        setTitle("");
        setStart("");
        setEnd("");
        setEventModalOpen(false);
    }

    return (
        <EventModalContext.Provider value={{setEventModalOpen, setCalendarRef, setStart, setEnd}}>
            {props.children}
            <Modal open={open} setEventModalOpen={setEventModalOpen}>
                <div className="title"><h3>Add Event</h3></div>
                    <div className="content">
                        <div className="input-group">
                            <label>Title: </label>
                            <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
                        </div>
                        <div className="input-group">
                            <label>Start Date: </label>
                            <DateTime 
                                value={start} 
                                onChange={date=>setStart(date)} 
                                inputProps={{
                                    className: "datetime-input"
                                }}/>
                        </div>
                        <div className="input-group">
                            <label>End Date: </label>
                            <DateTime 
                                value={end} 
                                onChange={date=>setEnd(date)} 
                                className="datetime-input-container"
                                inputProps={{
                                    className: "datetime-input"
                                }}/>
                        </div>
                    </div>
                    <div className="actions">
                        <Button onClick={()=>setEventModalOpen(false)}>Cancel</Button>
                        <Button style={{backgroundColor:"#1177BB", color:"white"}} onClick={onSubmit}>Submit</Button>
                    </div>
            </Modal>
        </EventModalContext.Provider>
    )
}

export default EventModalProvider
