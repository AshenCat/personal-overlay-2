const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
}

let personSchema = new Schema({
    firstname: requiredString,
    lastname: requiredString,
    age: Number,
    email: requiredString,
    number: Number,
    prefContact: {
        type: String,
        enum: ['email', 'number', 'plsdont'],
        default: 'plsdont'
    }
    // for the memes
    // ppsize: String
})

module.exports = mongoose.model('people', personSchema)