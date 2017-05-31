/**
 * Created by SMELISSON on 23/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    nom: {type: String, unique: true},
    _date: {
        type: Date,
        default: Date.now
    },
    _members: [{ type: Schema.Types.ObjectId, ref: 'Members'}]
});

module.exports = mongoose.model('Courses', CourseSchema);