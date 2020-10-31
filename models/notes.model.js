var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notesSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    noteTitle: { type: String},
    noteDesc: { type: String},
    isShared: { type: Boolean, default:false},
    sharedWith: { type: Array }
});

module.exports = mongoose.model('Note', notesSchema);