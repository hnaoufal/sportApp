const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    firstName: String,
    lastName: String,
    age: Number,
    companyId: String,
});

const ModelClass = mongoose.model('users', userSchema);

module.exports = ModelClass;
