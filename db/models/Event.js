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
        type: mongoose.Types.ObjectId,
        ref: 'Sprint'
    },
    allDay: Boolean,
    url: String,
    editable: Boolean,
    durationEditable: Boolean,
    resourceEditable: Boolean,
    overlap: Boolean,
    contraint: [{
        type: mongoose.Types.ObjectId,
        ref: 'Sprint'
    }],

    assignedTo: [{
        type: mongoose.Types.ObjectId,
        ref: 'People'
    }],
    status: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model("events", eventSchema)
