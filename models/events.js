const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id: { type: String, unique: true },
    name: String,
    address: String,
    date: Date,
    starttime: Date,
    endtime: Date,
    members: Number,
    maxMembers: Number,
});

const ModelClass = mongoose.model('events', eventSchema);

module.exports = ModelClass;
