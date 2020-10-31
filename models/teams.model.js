var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamsSchema = new Schema({
    name : {type : String},
    userid: { type: Array},
    notes: { type: Array }
});

module.exports = mongoose.model('Team', teamsSchema);