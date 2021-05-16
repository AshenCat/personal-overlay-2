// mongoose controllers
const EventModel = require('../models/Event');
const SprintModel = require('../models/Sprint')
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
    const sprints = await SprintModel.find().lean().exec();
    e.sender.send('LoadSprints', sprints)
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
    LoadSprints
}