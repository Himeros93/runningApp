/**
 * Created by A648067 on 30/05/2017.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PerformanceSchema = new Schema({
    temps: Number
});

module.exports = mongoose.model('Performance', ParcoursSchema);