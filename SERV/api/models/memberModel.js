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
    performance: [{ type: Schema.Types.ObjectId, ref: 'Members', required:true }]
});

module.exports = mongoose.model('Members', MemberSchema);