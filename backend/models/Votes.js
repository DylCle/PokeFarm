const mongoose = require('mongoose')
const Schema = mongoose.Schema

const votesSchemea = new Schema({
    _id: {
        type: Number,
        requird: true
    },
    name: {
        type: String,
        requird: true
    },
    votes: {
        type: Number,
        requird: true
    }
   

}, { timestamps: true })

module.exports = mongoose.model('Vote', votesSchemea)
