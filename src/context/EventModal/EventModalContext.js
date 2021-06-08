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
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
// import { nanoid } from 'nanoid'
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
    const [dates, setDates] = React.useState("")
    const [allDay, setAllDay] = React.useState(true)
    const [desc, setDesc] = React.useState("")
    const [calendarRef, setCalendarRef] = React.useState(null)
    const [min, setMin] = React.useState('')
    const [max, setMax] = React.useState('')
    // const [obj, setObj] = React.useState({})
    // const [func, setFunc] = React.useState(null)

    const onSubmit = () => {
        if (title === "") return;
        // if (dates[1] && dates[1] !== "") if(moment(dates[0]).isAfter(moment(dates[1]))) return;
        if(!dates) return;
        // console.log(sVal.format('MM-DD-YYYY HH:mm:ss'));
        // console.log(eVal.format('MM-DD-YYYY HH:mm:ss'));
        const obj = {
            // _id: nanoid(),
            title, 
            // start: dates[0] ? moment(dates[0]).toDate() : null, 
            // end: dates[1] ? moment(dates[1]).toDate() : null,
            // start: dates[0] ? moment().year(dates[0].year).month(dates[0].month).day(dates[0].day).hour(dates[0].hour).minute(dates[0].minute) : null,
            // end: dates[1] ? moment().year(dates[1].year).month(dates[1].month).day(dates[1].day).hour(dates[1].hour).minute(dates[1].minute) : null,
            start: moment(dates.toString()).add('1','second').toDate(),
            // end: dates[1] ? moment(dates[1].toString()).add('1','second').toDate() : null,
            allDay: allDay,
            description: desc,
        }
        // func(obj)
        
        if (calendarRef?.current) {
            console.log('from home')
            console.log(obj)
            calendarRef.current.getApi().addEvent(obj);
        }
        if (calendarRef?.new) {
            console.log('from edit sprint')
            // console.log(dates.map(date => date.toString()))
            calendarRef.new.setSprint(obj)
        }

        onClose();
    }

    const onClose = () => {
        console.log('clear')
        setTitle("");
        // setStart("");
        // setEnd("");
        setDates("")
        setAllDay(true);
        setDesc('');
        setMin('')
        setMax('')
        // setFunc(null)
        setCalendarRef(null);
        setEventModalOpen(false);
    }
    return (
        <EventModalContext.Provider value={{setEventModalOpen, setCalendarRef, setDates, setMin, setMax}}>
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
                            <SimpleCheckbox value={allDay} onClick={()=>{
                                // console.log(dates)
                                // setDates([])
                                setAllDay(prev=>!prev)
                            }} />
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
                                format={allDay ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss"}
                                value={dates}
                                onChange={date=>{
                                    console.log(date.toString())
                                    setDates(date)
                                    // console.log(moment(date[0].format('YYYY-MM-DD HH:MM')))
                                }}
                                plugins={allDay ? [<DatePanel markFocused />] : [<TimePicker position="bottom" />, <DatePanel markFocused />]}
                                // range
                                minDate={min}
                                maxDate={max}
                                showOtherDays
                                // className="modal-calendar bg-dark"
                                />
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
