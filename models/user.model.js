
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    //userid: { type: String, required: true, trim: true, index: true, unique: true},
    userid: { type: String, required: true, trim: true},
    notes: { type: Array }
});

module.exports = mongoose.model('User', userSchema);