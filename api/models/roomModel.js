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
    type: ParcoursSchema
  },
  admin: {
    type: [String],
    Required: true
  }
});



module.exports = mongoose.model('Rooms', RoomSchema);