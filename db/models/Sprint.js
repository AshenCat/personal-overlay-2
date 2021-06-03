const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
}

let sprintSchema = new Schema({
    title: requiredString,
    description: requiredString,
    status: {
        type: String,
        enum: ["active", "done", "waiting", "on hold", "failed"],
        default: "waiting",
    },
    events: [{
        type: mongoose.Types.ObjectId,
        ref: 'events'
    }],
    participants: [{
        type: mongoose.Types.ObjectId,
        ref: 'participants'
    }],
    start: Date,
    end: Date,
}, {timestamps: true})

module.exports = mongoose.model('sprints', sprintSchema)