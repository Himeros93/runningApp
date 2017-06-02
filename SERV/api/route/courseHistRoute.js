/**
 * Created by SMELISSON on 23/05/2017.
 */
'use strict';
module.exports = function(app) {
    var courseHist = require('../controllers/courseHistController');

    // todoList Routes
    app.route('/coursesHist/')
        .get(courseHist.list_all_courseHist)
        .post(courseHist.create_a_courseHist);

    app.route('/coursesHist/:courseHistId')
        .get(courseHist.read_a_courseHist);

    app.route('/coursesHist/min/:courseHistDate')
        .get(courseHist.get_a_courseHist);

    app.route('/coursesHist/:courseHistId')
        .put(courseHist.update_a_courseHist)
        .delete(courseHist.delete_a_courseHist);
};