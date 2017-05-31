'use strict';
var mongoose = require('mongoose'),
    Event = mongoose.model('Events');
	
	
exports.list_for_user = function(req, res) {
    Event.find({To : req.params.eventTo}, function(err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
};

exports.create_an_event = function(req, res) {
    var new_event = new Event(req.body);
    new_event.save(function(err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
};
	
exports.delete_an_event = function(req, res) {
    Event.remove({
        _id: req.params.eventId
    }, function(err, event) {
        if (err)
            res.send(err);
        res.json({ message: 'Member successfully deleted' });
    });
};