// mongoose controllers
const EventModel = require('../models/Event');
// const PersonModel = require('../models/Peron');
const moment = require('moment')

const onEventAdd = async (e, data) => {
    if(!data.end) data.end = data.start;
    const newEvent = new EventModel(data)
    const eventSaved = await newEvent.save();
    if (eventSaved) e.sender.send('onEventAdd', `Successfully added ${eventSaved.title}`)
    else {
        //handle fail
        e.sender.send('dbFail', `failed to add ${eventSaved.title}`)
    }
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
    LoadCalendarEvents
}