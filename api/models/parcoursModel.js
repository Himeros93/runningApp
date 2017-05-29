'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParcoursSchema = new Schema({
  id: {
    type: String,
	unique: true
  },
  longueur: [Number],
  lat: {
    type: [Number]
  },
  long: {
    type: [Number]
  }
});

module.exports = mongoose.model('Parcours', ParcoursSchema);