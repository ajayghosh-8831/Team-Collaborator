var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linksSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    linkTitle: { type: String},
    linkUrl: { type: String},
    isShared: { type: Boolean, default:false},
    sharedWith: { type: Array },
    sharedBy : { type: String},
    sharedByUserImg : { type: String}
});

module.exports = mongoose.model('Link', linksSchema);