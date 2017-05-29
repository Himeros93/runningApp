/**
 * Created by SMELISSON on 23/05/2017.
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
    mdp: String
});

module.exports = mongoose.model('Members', MemberSchema);