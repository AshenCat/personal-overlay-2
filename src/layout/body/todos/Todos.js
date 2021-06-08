import moment from 'moment'
import React from 'react'
import { AutoSizer, List } from 'react-virtualized'
import Card from '../../../components/card/Card'
import Input from '../../../components/input/inputText/Input'
import './todos.scss'

function Todos() {
    // const [selectedSprint, setSelectedSprint] = React.useState(null)

    const [sprintsToday, setSprintsToday] = React.useState([])
    const [eventsWithoutParents, setEventsWithoutParents] = React.useState([])

    const [search, setSearch] = React.useState('')

    const [eventsCount, setFilteredEventsCount] = React.useState(0)
    const [eventsFiltered, setEventsFiltered] = React.useState([])

    React.useEffect(()=>{
        api.send('LoadSprintsToday', {})
        api.send('LoadEventsWithoutParents', {})
        api.recieve('LoadSprintsToday', sprintsTodayRes=>{
            setSprintsToday([...sprintsTodayRes])
        })
        api.recieve('LoadEventsWithoutParents', eventsRes => {
            setEventsWithoutParents([...eventsRes])
        })
        return () => {
            api.removeAllListeners('LoadSprintsToday')
            api.removeAllListeners('LoadEventsWithoutParents')
        }
    }, [])

    //filters
    React.useEffect(()=>{
        const newEvent = eventsWithoutParents.filter(event => {
            if(search === '') return true; 
            if(event.title.includes(search)) return true;
            if(moment(event.start).format('YYYY MMM DD').includes(search)) return true;
            return false;
        })
        setEventsFiltered(newEvent);
        setFilteredEventsCount(newEvent.length);
    }, [search, eventsWithoutParents])

    const RowCard = (propsies) => {
        const {
            index,
            key,
            style
        } = propsies;
        const data = eventsFiltered[index]
        if(data) return <div key={key} style={style} className="autosizer-row-container">
                            <div className="autosizer-inside">
                                <div className="row-title">Title: {data?.title}</div>
                                <div className="row-date">Start: {moment(data?.start).format('YYYY MMM DD')}</div>
                            </div>
                        </div>
    }

    return (
        <article className="view-sprint-container">
            <section className="section-left">
                <h1>Todos</h1>
                <div className="input-group">
                    <label>Search: </label>
                    <Input value={search} onChange={e=>setSearch(e.target.value)} className="input-modified" />
                </div>
                <Card className="m-5px" noButton>
                    <h4 className="card-title">
                        Sprints today
                    </h4>
                    <div className="card-body">
                        
                    </div>
                </Card>
                <Card className="m-5px" noButton>
                    <h4 className="card-title">
                        Events
                    </h4>
                    <div className="card-body">
                        <AutoSizer>
                            {({width, height})=> {
                            return <List 
                                height={height}
                                width={width}
                                overscanRowCount={2}
                                rowHeight={60}
                                rowCount={eventsCount}
                                rowRenderer={RowCard}
                                className="autosizer"
                                containerStyle={{borderBottom: '1px solid gray'}}
                                />
                            }}
                        </AutoSizer>
                    </div>
                </Card>
            </section>            
            <section className="section-right">
                asd
            </section>            
        </article>
    )
}

export default Todos
