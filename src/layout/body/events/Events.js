import React from 'react';
import './events.scss';
import Card from '../../../components/card/Card';
import Input from '../../../components/input/inputText/Input';
import Slider from '../../../components/checkbox/slider/Slider';
import moment from 'moment';
import { AutoSizer, List } from 'react-virtualized';
import Button from '../../../components/button/Button';
import { withRouter } from 'react-router';

function Events(props) {
    const [events, setEvents] = React.useState([]);
    const [eventsFiltered, setEventsFiltered] = React.useState([]);
    const [filteredCount, setFilteredCount] = React.useState(0)
 
    const [searchFilter, setSearchFilter] = React.useState('');
    const [hideFinished, setHideFinished] = React.useState(false);
    const [hideWithSprint, setHideWithSprint] = React.useState(false);


    React.useEffect(()=>{
        api.send('LoadAllEvents', {})
        api.recieve('LoadAllEvents', data => {
            setEvents(data)
            setEventsFiltered(data)
            setFilteredCount(data.length)
        })
        api.recieve('ChangeEventStatus', () => {
            api.send('LoadAllEvents', {})
        })
        return () => {
            api.removeAllListeners('LoadAllEvents');
            api.removeAllListeners('ChangeEventStatus');
        }
    }, [])

    React.useEffect(()=>{
        const newEvents = events.filter(ev => {
            if (hideFinished) return !ev.status;
            return true;
        }).filter(ev => {
            if (hideWithSprint) return !ev.groupId;
            return true;
        }).filter(ev => {
            if (searchFilter.trim() === '') return true;
            if (ev.title.includes(searchFilter)) return true; 
            if (ev.description.includes(searchFilter)) return true; 
            if(moment(ev.start).format('YYYY MMM DD').toLowerCase().includes(searchFilter.toLowerCase())) return true;
        })
        setEventsFiltered([...newEvents])
        setFilteredCount(newEvents.length)
        console.log(newEvents)
    }, [searchFilter, hideFinished, hideWithSprint])

    const changeEventStatus = (id) => {
        api.send('ChangeEventStatus', id)
    }

    const RowCard = (propsies) => {
        const {
            index,
            key,
            style
        } = propsies;
        const data = eventsFiltered[index];
        if(data) return <div key={key} style={style} className={`autosizer-row-container ${data?.status ? 'event-done' : ''}`}>
                            <div className="autosizer-inside cursor-pointer">
                                <div className="col">
                                    <div className="short row-title">
                                        <span className={`${data?.status ? 'event-done-text' : ''}`}><h3>{data?.title}</h3></span>
                                    </div>
                                    <div className="short row-title"> 
                                        From: &nbsp;
                                        <span className={`${data?.status ? 'event-done-text' : ''}`}>
                                            {data?.groupId?.title}
                                        </span>
                                        {!data.groupId ? 'No parent...' : ''}
                                    </div>
                                    <div className="short row-title"> - <span className={`${data?.status ? 'event-done-text' : ''}`}>
                                        <em>"{data?.description}"</em></span>
                                    </div>
                                    <div className="row-date">
                                        <span className={`${data?.status ? 'event-done-text' : ''}`}>{moment(data?.start).format('YYYY MMM DD')}</span>
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <Button className="view-btn" onClick={()=>props.history.push(`/todos/${data?.groupId?._id}`)} disabled={!data?.groupId}>View on sprint</Button>
                                    <Button className={`mark-btn ${data?.status ? 'bg-green' : ''}`} onClick={()=>changeEventStatus(data?._id)}>{data?.status ? 'Finished' : 'Unfinished'}</Button>
                                    <Button className="danger-btn">Delete</Button>
                                </div>
                            </div>
                        </div>
    }

    return (
        <section className="events">
            <aside className="events-filter">
                <h2>Events</h2>
               <Card noButton>
                   <div className="card-title">
                       <h3>Events Filter</h3>
                   </div>
                   <div className="form-group">
                       <label>Search:</label>
                       <Input value={searchFilter} onChange={(e)=>setSearchFilter(e.target.value)} className="cWidth" />
                   </div>
                   <div className="form-group">
                       <label>Hide Finished:</label>
                       <Slider value={hideFinished} onClick={()=>setHideFinished(prev=>!prev)}/>
                   </div>
                   <div className="form-group">
                       <label>Hide with sprint:</label>
                       <Slider value={hideWithSprint} onClick={()=>setHideWithSprint(prev=>!prev)}/>
                   </div>
               </Card>
            </aside> 
            <article className="events-content">
                <AutoSizer>
                    {({width, height})=> {
                        return <List 
                                    height={height}
                                    width={width}
                                    overscanRowCount={2}
                                    rowHeight={149}
                                    rowCount={filteredCount}
                                    rowRenderer={RowCard}
                                    className="autosizer"
                                    containerStyle={{borderBottom: '1px solid gray'}}
                                    />
                        }}
                </AutoSizer>
            </article>
        </section>
    )
}

export default withRouter(Events)
