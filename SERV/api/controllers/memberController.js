/**
 * Created by A648067 on 23/05/2017.
 */
'use strict';
var mongoose = require('mongoose'),
    Member = mongoose.model('Members');

exports.list_all_members = function(req, res) {
    Member.find({}, function(err, member) {
        if (err)
            res.send(err);
        res.json(member);
    });
};

exports.create_a_member = function(req, res) {
	var erreur = [];
	var value = req.body;
	Member.find({pseudo: value.pseudo}, function(err, result){
		if(result.length){
			erreur.push("Le pseudo existe déjà. ");
		}
	});
	Member.find({mail: value.email}, function(err, result){
		if(result.length){
			erreur.push("Le mail est déjà utilisé. ");
		}
	});
	if(!value.mdp || !value.nom || !value.email || !value.pseudo){
		erreur.push("Tous les champs n'ont pas été remplis. ")
	}
	if(erreur.length === 0){
		var new_member = new Member(req.body);
		new_member.save(function(err, member) {
			if (err)
				res.send(err);
			res.json(member);
		});
	} else {
		res.status(400).send(erreur.join(''));
	}
};

exports.connect_a_member = function(req, res) {
	var erreur = [];
	var value = req.body;
	console.log(req.body);
	console.log(value);
	Member.find({pseudo: value.pseudo, mdp: value.mdp}, function(err, result){
		if(result.length){
			result[0].token = value.token;
			result[0].save(function (error, updatedValue) {
				if (error) {return handleError(error)};
				console.log(updatedValue);
				res.json(updatedValue);
			});
		}else{
			erreur.push("Erreur pseudo ou mot de passe. ");
		}
	});
	if(erreur.length !== 0){
		res.status(400).send(erreur.join(''));
	}
};

exports.read_a_member = function(req, res) {
    Member.find({ $or:[{'pseudo': new RegExp(req.params.memberPseudo, 'i')},{'nom': new RegExp(req.params.memberPseudo, 'i')}] },
        function(err, member) {
            if (err)
                res.send(err);
            res.json(member);
        });
};

exports.update_a_member = function(req, res) {
    Member.findOneAndUpdate(req.params.memberId, req.body, {new: true}, function(err, member) {
        if (err)
            res.send(err);
        res.json(member);
    });
};

exports.delete_a_member = function(req, res) {
    Member.remove({
        _id: req.params.memberId
    }, function(err, member) {
        if (err)
            res.send(err);
        res.json({ message: 'Member successfully deleted' });
    });
};

function random32bit() {
    let u = new Uint32Array(1);
    window.crypto.getRandomValues(u);
    let str = u[0].toString(16).toUpperCase();
    return '00000000'.slice(str.length) + str;
}