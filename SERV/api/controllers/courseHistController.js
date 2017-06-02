/**
 * Created by SMELISSON on 23/05/2017.
 */
'use strict';
var mongoose = require('mongoose'),
    CourseHist = mongoose.model('CourseHist');

exports.list_all_courseHist = function(req, res) {
    CourseHist.find({})
        .exec(function(err, courseHist) {
            if (err)
                res.send(err);
            res.json(courseHist);
        });
};

exports.create_a_courseHist = function(req, res) {
    var new_courseHist = new CourseHist(req.body);
    new_courseHist.temps = calculTemps(new_courseHist.temps);
    new_courseHist.save(function(err, courseHist) {
        console.log(courseHist);
        if (err)
            res.send(err);
        res.json(courseHist);
    });
};

exports.read_a_courseHist = function(req, res) {
    CourseHist.findById(req.params.courseHistId)
        .populate('_members' , 'pseudo nom')
        .populate('_parcours')
        .exec(function(err, courseHist) {
            if (err)
                res.send(err);
            res.json(courseHist);
        });
};

exports.get_a_courseHist = function(req, res) {
    CourseHist.find({'date': new RegExp(req.params.courseHistDate, 'i')})
        .exec(function(err, courseHist) {
            if (err)
                res.send(err);
            res.json(courseHist);
        });
};

exports.update_a_courseHist = function(req, res) {
    CourseHist.findOneAndUpdate(req.params.courseHistId, req.body, {new: true}, function(err, courseHist) {
        if (err)
            res.send(err);
        res.json(courseHist);
    });
};

exports.delete_a_courseHist = function(req, res) {
    CourseHist.remove({
        _id: req.params.courseHistId
    }, function(err, courseHist) {
        if (err)
            res.send(err);
        res.json({ message: 'Course Historic successfully deleted' });
    });
};

function calculTemps(temps){
    var h, m, s;
    h = Math.floor(temps / 3600);
    m = (temps - 3600) / 60;
    s = Math.floor((m - Math.floor(m)) * 60);
    m = Math.floor(m);

    return h + ':' + m + ":" + s ;
}
