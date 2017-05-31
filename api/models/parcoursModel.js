'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParcoursSchema = new Schema({
  longueur: [Number],
  lat: {
    type: [Number]
  },
  long: {
    type: [Number]
  }
});

module.exports = mongoose.model('Parcours', ParcoursSchema);