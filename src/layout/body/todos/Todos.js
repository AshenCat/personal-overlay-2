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
            if(event.includes(search)) return true;
            return false;
        })
        setEventsFiltered(newEvent);
        setFilteredEventsCount(newEvent.length);
    }, [search])

    const RowCard = (propsies) => {
        const {
            index,
            key,
            style
        } = propsies;
        const data = sprintFiltered[index]
        const width = propsies?.parent?.props?.width;
        if(data) return 
    }

    return (
        <article className="view-sprint-container">
            <section className="section-left">
                <h1>Todos</h1>
                <div className="input-group">
                    <label>Search: </label>
                    <Input className="input-modified" />
                </div>
                <Card className="m-5px">
                    <h4 className="card-title">
                        Sprints today
                    </h4>
                    <div className="card-body">
                        
                    </div>
                </Card>
                <Card className="m-5px">
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
                                rowHeight={330}
                                rowCount={0}
                                rowRenderer={RowCard}
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
