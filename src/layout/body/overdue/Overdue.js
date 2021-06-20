import moment from 'moment';
import React from 'react';
import { withRouter } from 'react-router';
import { AutoSizer, List } from 'react-virtualized';
import Button from '../../../components/button/Button';
import Chip from '../../../components/chip/Chip';
import { useOverdueContext } from '../../../context/OverdueContext/OverdueContext'
import './overdue.scss'

function Overdue(props) {
    const {overdueEvents, overdueSprints, queryOverdueEvents, queryOverdueSprints} = useOverdueContext();
    // const [overdueEventsList, setOverdueEventsList] = React.useState([...overdueEvents]);
    // const [overdueSprintsList, setOverdueSprintsList] = React.useState([...overdueSprints]);

    React.useEffect(()=>{
        queryOverdueEvents();
        queryOverdueSprints();
        api.recieve('ChangeEventStatus', () => {
            queryOverdueEvents();
        })
        return () => {
            api.removeAllListeners('ChangeEventStatus');
        }
    }, [])

    const changeEventStatus = (id) => {
        api.send('ChangeEventStatus', id)
    }

    const RowCardSprints = ({
        index,
        key,
        style
    }) => {
        const data = overdueSprints[index];
        const eventsCount = data?.events?.length + 1;
        if(data) return <div key={key} className="sprint" style={style}>
                            <div className="sprint-card">
                                <div className="sprint-card-body">
                                    <div className="short card-title space-between" style={{textTransform: 'capitalize', overflow: 'hidden'}}>
                                        Title:&nbsp; <h4 style={{margin: 0}}>{data?.title ?? <em>No title??</em>}</h4>
                                    </div>
                                    <div className="card-events-count space-between">
                                        Events: {eventsCount > 1 ? <span>{eventsCount}</span> : <em>No Events</em>}
                                    </div>
                                    <div className="card-events-count space-between">
                                        Start: <span>{moment(data.start).format('YYYY, MMM DD hh:mm a')}</span>
                                    </div>
                                    <div className="card-events-count space-between">
                                        End: <span>{moment(data.end).format('YYYY, MMM DD hh:mm a')}</span>
                                    </div>
                                    <div className="card-events-count space-between" style={{position: 'relative'}}>
                                        Status: 
                                        <Chip className={`chip-${data?.status.replace(/\s/g,'')}`}>
                                            <em>{data?.status}</em>
                                        </Chip>

                                    </div>
                                    <div className="card-description">
                                        Description: {<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "<em>{data?.description}</em>"</span> ?? <em>No Description</em>}
                                    </div>
                                    <div className="card-actions">
                                        <Button 
                                            style={{ padding: '8px'}}
                                            className="view-btn"
                                            onClick={()=>{props.history.push(`/todos/${data._id}`)}}
                                            disabled={data?.selected}>
                                                Set Sprint
                                        </Button>
                                        <Button 
                                            style={{ padding: '8px'}}
                                            className="edit-btn"
                                            onClick={()=>{props.history.push(`/sprints/${data._id}`)}}>
                                                Edit
                                        </Button>
                                        <Button
                                            onClick={()=>onDelete(data._id)}
                                            className="danger-btn">
                                                Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
    }

    const RowCardEvents = ({
        index,
        key,
        style
    }) => {
        const data = overdueEvents[index];
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
                                        <span className={`${data?.status ? 'event-done-text' : ''}`}>{moment(data?.start).format('YYYY, MMM DD hh:mm a')}</span>
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <Button className="view-btn" onClick={()=>props.history.push(`/todos/${data?.groupId?._id}`)} disabled={!data?.groupId}>View on sprint</Button>
                                    <Button className={`mark-btn ${data?.status ? 'bg-green' : ''}`} onClick={()=>changeEventStatus(data?._id)}>{data?.status ? 'Finished' : 'Set as Finished'}</Button>
                                    <Button className="danger-btn">Delete</Button>
                                </div>
                            </div>
                        </div>
    }

    return (
        <section className="overdue">
            <aside className="left">
                <h3>Overdue Sprint</h3>
                <div className="overdue-sprints-container">
                    <AutoSizer>
                        {({width, height})=> {
                            return  <List 
                                        height={height}
                                        width={width}
                                        overscanRowCount={2}
                                        rowHeight={262}
                                        rowCount={overdueSprints.length}
                                        rowRenderer={RowCardSprints}
                                        className="autosizer"
                                        />
                            }}
                    </AutoSizer>
                </div>
            </aside>
            <aside className="right">
                <h3>Overdue Events</h3>
                <div className="overdue-events-container">
                    <AutoSizer>
                        {({width, height})=> {
                            return  <List 
                                        height={height}
                                        width={width}
                                        overscanRowCount={2}
                                        rowHeight={149}
                                        rowCount={overdueEvents.length}
                                        rowRenderer={RowCardEvents}
                                        className="autosizer"
                                        containerStyle={{borderBottom: '1px solid gray'}}
                                        />
                            }}
                    </AutoSizer>
                </div>
            </aside>
        </section>
    )
}

export default withRouter(Overdue)
