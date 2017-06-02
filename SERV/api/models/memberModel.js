/**
 * Created by A648067 on 23/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    pseudo: {type: String, unique: true},
    nom: String,
    mail: String,
    Created_date: {
        type: Date,
        default: Date.now
    },
    mdp: {
        type : String,
        select: false
    },
    courseHist: [{ type: Schema.Types.ObjectId, ref: 'CourseHist', required:true }],
    performance: [{ type: Schema.Types.ObjectId, ref: 'Performance', required:true }],
    token: {type: String, unique: true}
});

module.exports = mongoose.model('Members', MemberSchema);