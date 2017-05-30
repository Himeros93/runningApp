/**
 * Created by A648067 on 30/05/2017.
 */
/**
 * Created by SMELISSON on 23/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseHistSchema = new Schema({
    nom: String,
    _date: {
        type: Date,
        default: Date.now
    },
    _members: [{ type: Schema.Types.ObjectId, ref: 'Members'}]
});

module.exports = mongoose.model('Courses', CourseSchema);