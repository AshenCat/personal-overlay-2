// mongoose controllers
const EventModel = require('../models/Event');
const SprintModel = require('../models/Sprint');
const ParticipantModel = require('../models/Participant');
const mongoose = require('mongoose');
// const PersonModel = require('../models/Peron');

const onEventAdd = async (e, data) => {
    if(!data.end) data.end = data.start;
    const { extendedProps } = data;
    
    let newData = {
        ...data,
        ...extendedProps,
        allDay: data.end === data.start ? true : false,
    }
    delete newData.extendedProps;
    console.log(newData)

    const newEvent = new EventModel(newData)
    const eventSaved = await newEvent.save();
    if (eventSaved) e.sender.send('onEventAdd', `Successfully added event: ${eventSaved._id}`)
    else {
        //handle fail
        e.sender.send('dbFail', `failed to add ${eventSaved.title}`)
    }
}

const onSprintAdd = async (e, data) => {
    console.log(data)
    const newSprint = new SprintModel(data);
    const eventSaved = await newSprint.save();
    if (eventSaved) e.sender.send('onSprintAdd', `Successfully added sprint: ${eventSaved._id}`)
    else {
        //handle fail
        e.sender.send('dbFail', `failed to add ${eventSaved.title}`)
    }
}

const LoadSprints = async (e) => {
    const sprints = await SprintModel.find().sort({updatedAt: -1}).lean().exec();
    // console.log(sprints)
    const resSprints = sprints.map(sprint => {
        return {
            ...sprint,
            _id: sprint._id.toHexString()
        }
    })
    e.sender.send('LoadSprints', resSprints)
}

const LoadSprint = async (e, id) => {
    try{
        const sprint = await SprintModel.findOne({_id: mongoose.Types.ObjectId(id)}).populate('events').lean();
        console.log(sprint.events)
        e.sender.send('LoadSprint', {
            ...sprint,
            _id: sprint._id.toHexString()
        })
    }
    catch(e) {
        console.log(e)
    }
}

const EditSprint = (e, sprint) => {
    const events = sprint.events;
    delete sprint.events;
    // console.log(events)
    // console.log(events.filter(event => !event._id))
    EventModel.insertMany(events.filter(event => !event._id), (err, ev)=>{
        if(ev) console.log('insert: true')
        SprintModel.findByIdAndUpdate(mongoose.Types.ObjectId(sprint._id), sprint, {new:true}, (err,doc)=>{
            if(doc)console.log('findbyid: true')
            doc.events.push(ev.map(e=>e._id))
            doc.save()
            e.sender.send('EditSprint', `Successfully edited ${sprint._id}`); 
        })
    })

}

const DeleteSprint = async (e, id) => {
    await SprintModel.findByIdAndDelete(mongoose.Types.ObjectId(id)).exec();
    console.log(`Deleted: ${id}`)
    e.sender.send('DeleteSprint', `Successfully deleted ${id}`);
}

const LoadCalendarEvents = async (e, month) => {
    const eventsOnThisMonth = await EventModel.find({
        start: {
            $gte: month.monthStart,
        },
        end: {
            $lt: month.monthEnd
        }
    }).lean().exec();
    e.sender.send('LoadCalendarEvents', eventsOnThisMonth)
}

module.exports = {
    onEventAdd,
    onSprintAdd,
    LoadCalendarEvents,
    LoadSprints,
    LoadSprint,
    EditSprint,
    DeleteSprint
}