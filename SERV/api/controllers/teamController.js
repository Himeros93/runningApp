/**
 * Created by SMELISSON on 23/05/2017.
 */
'use strict';
var mongoose = require('mongoose'),
    Team = mongoose.model('Teams');

exports.list_all_teams = function(req, res) {
    Team.find({})
    .populate('_membre')
    .populate('_createur')
    .exec(function(err, team) {
        if (err)
            res.send(err);
        res.json(team);
        });
};

exports.create_a_team = function(req, res) {
    var new_team = new Team(req.body);
    new_team.save(function(err, team) {
        console.log(team);
        if (err)
            res.send(err);
        res.json(team);
    });
};

exports.read_a_team = function(req, res) {
    Team.find({'nom': new RegExp(req.params.teamNom, 'i')})
        .populate('_membres' , 'pseudo nom')
        .populate('_createur')
        .exec(function(err, team) {
        if (err)
            res.send(err);
        res.json(team);
    });
};

exports.update_a_team = function(req, res) {
    Team.findOneAndUpdate(req.params.teamId, req.body, {new: true}, function(err, team) {
        if (err)
            res.send(err);
        res.json(team);
    });
};

exports.delete_a_team = function(req, res) {
    Team.remove({
        _id: req.params.teamId
    }, function(err, team) {
        if (err)
            res.send(err);
        res.json({ message: 'Team successfully deleted' });
    });
};
