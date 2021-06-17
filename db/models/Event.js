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
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sprints'
    },
    allDay: Boolean,
    url: String,
    editable: Boolean,
    durationEditable: Boolean,
    resourceEditable: Boolean,
    overlap: Boolean,
    constraint: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sprints'
    }],

    dateFinished: Date,
    description: String,
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'participants'
    }],
    status: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', ''],
        default: ''
    },
    tags: [{
        type: String
    }],
}, {timestamps: true})

module.exports = mongoose.model("events", eventSchema)
