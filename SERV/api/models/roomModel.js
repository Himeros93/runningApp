'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParcoursSchema = require('mongoose').model('Parcours').schema;


var RoomSchema = new Schema({
  id: {
    type: String,
    Required: 'Veuillez entrer l id de la room',
	unique: true
  },
  parcours: {
    type: { type: Schema.Types.ObjectId, ref: 'Parcours'}
  },
  admin: [{ type: Schema.Types.ObjectId, ref: 'Team', required:true }]
});



module.exports = mongoose.model('Rooms', RoomSchema);