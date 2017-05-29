/**
 * Created by SMELISSON on 23/05/2017.
 */
'use strict';
module.exports = function(app) {
    var Courses = require('../controllers/courseController');

    app.route('/courses')
        .get(Courses.list_all_courses)
        .post(Courses.create_a_course);


    app.route('/courses/:courseId')
        .get(Courses.read_a_course)
        .put(Courses.update_a_course)
        .delete(Courses.delete_a_course);
};