const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
}

let eventSchema = new Schema({
    title: requiredString,
    start: Date,
    end: Date,
    description: String,
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sprint'
    },
    allDay: Boolean,
    url: String,
    editable: Boolean,
    durationEditable: Boolean,
    resourceEditable: Boolean,
    overlap: Boolean,
    constraint: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sprint'
    }],

    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'participants'
    }],
    status: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model("events", eventSchema)
