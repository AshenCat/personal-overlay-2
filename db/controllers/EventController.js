// mongoose controllers
const EventModel = require('../models/Event');
const SprintModel = require('../models/Sprint');
const ParticipantModel = require('../models/Participant');
var moment = require('moment');
const mongoose = require('mongoose');
// const PersonModel = require('../models/Peron');

const onEventAdd = async (e, data) => {
    // if(!data.end) data.end = data.start;
    const { extendedProps } = data;
    
    let newData = {
        ...data,
        ...extendedProps,
        // allDay: data.end === data.start ? true : false,
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

const ChangeEventStatus = async (e, id) => {
    const event = await EventModel.findById(id).exec();
    event.status = !event.status;
    event.save();
    console.log(`Quick mark status: ${event.status}`)
    console.log(event._doc)
    e.sender.send('ChangeEventStatus', {
        ...event._doc,
        _id: event._id.toHexString()
    })
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
        // console.log(sprint.events)
        e.sender.send('LoadSprint', {
            ...sprint,
            _id: sprint._id.toHexString(),
            events: [...sprint.events.map(ev => {
                return {
                    ...ev,
                    _id: ev._id.toHexString()
                }
            })]
        })
    }
    catch(e) {
        console.log(e)
    }
}

const EditSprint =  (e, sprint) => {
    const events = sprint.events;
    const del = sprint.del;
    delete sprint.events;
    delete sprint.del;    
    
    const newEvents = events.filter(e=>!e._id);

    if(newEvents.length > 0) {
        EventModel.insertMany(events.filter(e=>!e._id), (err, docs)=>{
            console.log(docs)
            SprintModel.findByIdAndUpdate(mongoose.Types.ObjectId(sprint._id), sprint, {new:true}, (err,doc)=>{
                if(doc) console.log('findbyid: true')
        
                if(del) {
                    del.map( async (dl)=> {
                        await doc.events.pull(dl._id)
                        EventModel.findByIdAndDelete(mongoose.Types.ObjectId(sprint._id),{},(err, doc) => {
                            console.log(`ID: ${dl._id} deleted!`)
                            e.sender.send('DeletedEvent', `Successfully deleted event: ${dl._id}`)
                        })
                    })
                }

                // doc.events.push(docs.map(e=>e._id))
                docs.map(e=>{
                    doc.events.push(e._id)
                })
        
                // events.filter(event => !event._id).map( async (event) => {
                //     const item = new EventModel(event);
                //     const saved = await item.save();
                //     if(saved) doc.events.push(item._id)
                // });
        
                doc.save()
                e.sender.send('EditSprint', `Successfully edited ${sprint._id}`); 
            })
        })
    }
    else {
        SprintModel.findByIdAndUpdate(mongoose.Types.ObjectId(sprint._id), sprint, {new:true}, (err,doc)=>{
            if(doc) console.log('findbyid: true')
    
            if(del) {
                del.map( async (dl)=> {
                    await doc.events.pull(dl._id)
                    EventModel.findByIdAndDelete(mongoose.Types.ObjectId(sprint._id),{},(err, doc) => {
                        console.log(`ID: ${dl._id} deleted!`)
                        e.sender.send('DeletedEvent', `Successfully deleted event: ${dl._id}`)
                    })
                })
            }
    
            // events.filter(event => !event._id).map( async (event) => {
            //     const item = new EventModel(event);
            //     const saved = await item.save();
            //     if(saved) doc.events.push(item._id)
            // });
    
            doc.save()
            e.sender.send('EditSprint', `Successfully edited ${sprint._id}`); 
        })
    }
}

const DeleteSprint = async (e, id) => {
    await SprintModel.findByIdAndDelete(mongoose.Types.ObjectId(id)).exec();
    console.log(`Deleted: ${id}`)
    e.sender.send('DeleteSprint', `Successfully deleted ${id}`);
}

const LoadSprintsToday = async (e) => {
    const dateToday = moment();
    const sprintsToday = await SprintModel.find({
        
        $or: [
            // date in between start and end
            {$and: [
                {start: {$lte: new Date(dateToday.format('YYYY-MM-DD'))}},
                {end: {$gte: new Date(dateToday.format('YYYY-MM-DD'))}},
            ]},
            // start is between today and tomorrow
            {
                start: {
                    $gte: new Date(dateToday.format('YYYY-MM-DD').toString()), 
                    $lte: new Date(dateToday.add(1, 'day').format('YYYY-MM-DD')),
                }
            },
        ],
        
    }).lean().exec();
    
    e.sender.send('LoadSprintsToday', sprintsToday.map(sprint => {
        return {
            ...sprint,
            _id: sprint._id.toHexString()
        }
    }))
}

const LoadCalendarData = async (e, month) => {
    const type = month.ofType;
    if (type === 'events') {
        const eventsOnThisMonth = await EventModel.find({
            start: {
                $gte: month.monthStart,
            },
            $or: [
                {end: {$lt: month.monthEnd}},
                {end: null}
            ]
        }).lean().exec();
        e.sender.send('LoadCalendarData', eventsOnThisMonth)
    }
    else {
        const sprintsThisMonth = await SprintModel.find({
            start: {
                $gte: month.monthStart,
            },
            $or: [
                {end: {$lt: month.monthEnd}},
                {end: null}
            ]
        }).lean().exec();
        e.sender.send('LoadCalendarData', sprintsThisMonth)
    }
}

const LoadEventsWithoutParents = async (e) => {
    const events = await EventModel.find({groupId: {$eq: null}}).lean().exec();
    e.sender.send('LoadEventsWithoutParents', events);
}

module.exports = {
    onEventAdd,
    onSprintAdd,
    LoadCalendarData,
    LoadSprints,
    LoadSprint,
    EditSprint,
    DeleteSprint,
    LoadSprintsToday,
    LoadEventsWithoutParents,
    ChangeEventStatus
}