import React from 'react'
import Button from '../../components/button/Button';
import './eventmodalcontext.scss'
import DateTime from 'react-datetime'
import moment from 'moment';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/inputText/Input';
import SimpleCheckbox from '../../components/checkbox/simple/simpleCheckbox';
import Textarea from '../../components/input/textarea/Textarea';

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
    const [allDay, setAllDay] = React.useState(false)
    const [desc, setDesc] = React.useState("")
    const [calendarRef, setCalendarRef] = React.useState({})

    const onSubmit = () => {
        if (title === "" || start === "") return;
        if (end !== "") if(moment(start).isAfter(end)) return;
        // if (start === end) return;
        // console.log(sVal.format('MM-DD-YYYY HH:mm:ss'));
        // console.log(eVal.format('MM-DD-YYYY HH:mm:ss'));
        calendarRef.current.getApi().addEvent({
            title, 
            start: moment(start).toDate(), 
            end: moment(end).toDate(),
            allDay: allDay,
            description: desc,
        });
        onClose();
    }

    const onClose = () => {
        console.log('clear')
        setTitle("");
        setStart("");
        setEnd("");
        setAllDay(false);
        setDesc('');
        setEventModalOpen(false);
    }

    return (
        <EventModalContext.Provider value={{setEventModalOpen, setCalendarRef, setStart, setEnd}}>
            {props.children}
            <Modal open={open} setEventModalOpen={setEventModalOpen} onClose={onClose}>
                <div className="title"><h3>Add Event</h3></div>
                <div className="content">
                    <div className="input-group">
                        <label>Title: </label>
                        <Input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} mAndP={true}/>
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
                    <div className={`input-group ${allDay ? 'hide-input' : ''}`}>
                        <label>End Date: </label>
                        <DateTime 
                            value={end} 
                            onChange={date=>setEnd(date)} 
                            className="datetime-input-container"
                            inputProps={{
                                className: "datetime-input"
                            }}/>
                    </div>
                    <div className="input-group">
                        <label>All day: </label>
                        <SimpleCheckbox value={allDay} onClick={()=>setAllDay(prev=>!prev)} />
                    </div>
                    <div className="input-group">
                        <label>Description: </label>
                        <Textarea value={desc} onChange={(e)=>setDesc(e.target.value)} />
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
