/**
 * Created by A648067 on 23/05/2017.
 */
'use strict';
var mongoose = require('mongoose'),
    Parcours = mongoose.model('Parcours');

exports.list_all_parcours = function(req, res) {
    Parcours.find({})
        .exec(function(err, parcours) {
            if (err)
                res.send(err);
            res.json(parcours);
        });
};

exports.create_a_parcours = function(req, res) {
    var new_parcours = new Parcours(req.body);
    new_parcours.save(function(err, parcours) {
        if (err)
            res.send(err);
        res.json(parcours);
    });
};

exports.read_a_parcours = function(req, res) {
    Parcours.findById(req.params.parcoursId)
        .exec(function(err, parcours) {
            if (err)
                res.send(err);
            res.json(parcours);
        });
};

exports.update_a_parcours = function(req, res) {
    Parcours.findOneAndUpdate(req.params.parcoursId, req.body, {new: true}, function(err, parcours) {
        if (err)
            res.send(err);
        res.json(parcours);
    });
};

exports.delete_a_parcours = function(req, res) {
    Parcours.remove({
        _id: req.params.parcoursId
    }, function(err, parcours) {
        if (err)
            res.send(err);
        res.json({ message: 'Parcours successfully deleted' });
    });
};