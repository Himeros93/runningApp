/**
 * Created by SMELISSON on 23/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    nom: String,
    _createur: [{ type: Schema.Types.ObjectId, ref: 'Members', required:true }],
    Created_date: {
        type: Date,
        default: Date.now
    },
    _membre: [{ type: Schema.Types.ObjectId, ref: 'Members', required:true }]
});

module.exports = mongoose.model('Teams', TeamSchema);