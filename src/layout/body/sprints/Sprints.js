import React from 'react'
import DateTime from 'react-datetime'
import Button from '../../../components/button/Button'
import Card from '../../../components/card/Card'
import Input from '../../../components/input/inputText/Input'
import Textarea from '../../../components/input/textarea/Textarea'
import Select from '../../../components/select/select'
import './sprints.scss'

function Sprints(props) {
    console.log(props.location)
    const [people, setPeople] = React.useState([...new Array(3)]);
    const [sprints, setSprints] = React.useState([...new Array(10)])
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [events, setEvents] = React.useState([]);
    const [participants, setParticipants] = React.useState([]);
    const [start, setStart] = React.useState('');
    const [end, setEnd] = React.useState('');
    
    
    return (
        <div className="sprints">
            <div className="sprint-filter-and-settings">
                <Card className="sprint-menu" noButton>
                    <h4 className="card-title">Add Sprint</h4>
                    <div className="form-body">
                        <div className="form-group">
                            <label>Title:</label>
                            <Input className="cWidth" placeholder="Enter title" />
                        </div>
                        <div className="form-group">
                            <label>From:</label>
                            <DateTime 
                                className="datetime-input-container"
                                inputProps={{
                                    className: "datetime-input"
                                }}/>
                        </div>
                        <div className="form-group">
                            <label>To:</label>
                            <DateTime 
                                className="datetime-input-container"
                                inputProps={{
                                    className: "datetime-input"
                                }}/>
                        </div>
                        <div className="form-group">
                            <label>Participants:</label>
                            <Select className="cWidth">
                                <option style={{color: 'black'}}>-----</option>
                                {people.map((person, ctr) =>{
                                    return <option style={{color: 'black'}} key={ctr}>Klifford{person?.name}</option>
                                })}
                            </Select>
                        </div>
                        <div className="form-group" style={{flexDirection: 'column', alignItems: 'unset'}}>
                            <label>Description: </label>
                            <Textarea />
                        </div> 
                        <div className="form-group">
                            <Button style={{width: '78%', marginTop: '8px'}}>Submit</Button>
                            <Button style={{width: '20%', marginTop: '8px', backgroundColor: '#ccc', color: 'black'}}>Clear</Button>
                        </div>
                    </div>
                </Card>
                <Card className="sprint-filter" noButton>
                    <h4 className="card-title">Sprints Filter</h4>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Search</label>
                            <Input className="cWidth" placeholder="Search" />
                        </div>
                    </div>
                </Card>
            </div>
            <div className="sprints-container">
                {sprints.map((sprint, ctr) => {
                    return <Card key={ctr} className="sprint">
                        Title: {sprint?.name}
                    </Card>
                })}
            </div>
        </div>
    )
}

export default Sprints
