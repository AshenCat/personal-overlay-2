import React from 'react'
import Button from '../../components/button/Button';
import './eventmodalcontext.scss'
// import DateTime from 'react-datetime'
import moment from 'moment';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/inputText/Input';
import SimpleCheckbox from '../../components/checkbox/simple/simpleCheckbox';
import Textarea from '../../components/input/textarea/Textarea';
import { Calendar } from 'react-multi-date-picker';

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
    // const [start, setStart] = React.useState("");
    // const [end, setEnd] = React.useState("");
    const [dates, setDates] = React.useState([])
    const [allDay, setAllDay] = React.useState(false)
    const [desc, setDesc] = React.useState("")
    const [calendarRef, setCalendarRef] = React.useState(null)
    // const [obj, setObj] = React.useState({})
    // const [func, setFunc] = React.useState(null)

    const onSubmit = () => {
        if (title === "") return;
        if (dates[1] && dates[1] !== "") if(moment(dates[0]?.toString()).isAfter(moment(dates[1]?.toString()))) return;
        // if (start === end) return;
        // console.log(sVal.format('MM-DD-YYYY HH:mm:ss'));
        // console.log(eVal.format('MM-DD-YYYY HH:mm:ss'));
        const obj = {
            title, 
            start: moment(dates[0]?.toString()).toDate() ?? null, 
            end: moment(dates[1]?.toString()).toDate() ?? null,
            allDay: allDay,
            description: desc,
        }
        // func(obj)
        
        if (calendarRef?.current) {
            console.log('from home')
            calendarRef.current.getApi().addEvent(obj);
        }
        if (calendarRef?.new) {
            console.log('from edit sprint')
            console.log(dates)
            calendarRef.new.setSprint(obj)
        }

        onClose();
    }

    const onClose = () => {
        if(open) {
            console.log('clear')
            setTitle("");
            // setStart("");
            // setEnd("");
            setAllDay(false);
            setDesc('');
        }
        // setFunc(null)
        setCalendarRef(null);
        setEventModalOpen(false);
    }

    return (
        <EventModalContext.Provider value={{setEventModalOpen, setCalendarRef, setDates}}>
            {props.children}
            <Modal open={open} setEventModalOpen={setEventModalOpen} onClose={onClose}>
                <div className="title"><h3>Add Event</h3></div>
                <div className="content">
                    <div className="left">
                        <div className="input-group">
                            <label>Title: </label>
                            <Input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} mAndP={true}/>
                        </div>
                        <div className="input-group">
                            <label>Description: </label>
                            <Textarea value={desc} onChange={(e)=>setDesc(e.target.value)} className="textarea-modal"/>
                        </div>
                        <div className="input-group">
                            <label>All day: </label>
                            <SimpleCheckbox value={allDay} onClick={()=>setAllDay(prev=>!prev)} />
                        </div>
                    </div>
                    {/* <div className="input-group">
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
                    </div> */}
                    <div className="right">
                        <div className="input-group" style={{flexFlow:"column"}}>
                            <label>Range: </label>
                            <Calendar
                                value={dates}
                                onChange={date=>{
                                    setDates(date)
                                    console.log(date)
                                }}
                                range
                                showOtherDays
                                className="modal-calendar bg-dark" />
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <Button onClick={()=>setEventModalOpen(false)} className="cancel-btn">Cancel</Button>
                    <Button style={{backgroundColor:"#1177BB", color:"white"}} className="submit" onClick={onSubmit}>Submit</Button>
                </div>
                
            </Modal>
        </EventModalContext.Provider>
    )
}

export default EventModalProvider
