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
    /*parcours: { type: Schema.Types.ObjectId, ref: 'Parcours'},*/
    _members: [{ type: Schema.Types.ObjectId, ref: 'Members'}],
    temps : String
});

module.exports = mongoose.model('CourseHist', CourseHistSchema);