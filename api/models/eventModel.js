var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    From: String,
    To: String,
    Type: String,
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Events', EventSchema);