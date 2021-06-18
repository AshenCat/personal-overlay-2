import moment from 'moment';
import React from 'react'
import { Calendar } from 'react-multi-date-picker';
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
    }, [])

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
                                        Start: <span>{moment(data.start).format('YYYY MMM DD')}</span>
                                    </div>
                                    <div className="card-events-count space-between">
                                        End: <span>{moment(data.end).format('YYYY MMM DD')}</span>
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
                    
                </div>
            </aside>
        </section>
    )
}

export default withRouter(Overdue)
