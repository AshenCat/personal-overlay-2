// mongoose controllers
const EventModel = require('../models/Event');
// const PersonModel = require('../models/Peron');

const onEventAdd = async (e, data) => {
    const newEvent = new EventModel(data)
    const eventSaved = await newEvent.save();
    if (eventSaved) e.sender.send('onEventAdd', `Successfully added ${eventSaved.title}`)
    else {
        //handle fail
        e.sender.send('dbFail', `Successfully added ${eventSaved.title}`)
    }
}

const LoadCalendarEvents = async (e, month) => {
    const eventsOnThisMonth = await EventModel.find({
        start: {
            $gte: month.monthBefore
        },
        end: {
            $lt: month.monthAfter
        }
    }).exec();
    console.log(eventsOnThisMonth)
    // console.log('getting dates for: ', month)
    e.sender.send('LoadCalendarEvents', eventsOnThisMonth)
}


module.exports = {
    onEventAdd,
    LoadCalendarEvents
}