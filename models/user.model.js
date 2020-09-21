
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    //userid: { type: String, required: true, trim: true, index: true, unique: true},
    userid: { type: String, required: true, trim: true, unique: true},
    notes: { type: Array },
    teams: { type: Array },
    links: {type:Array}
});

module.exports = mongoose.model('User', userSchema);