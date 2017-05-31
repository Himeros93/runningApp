'use strict';
module.exports = function(app) {
    var Events = require('../controllers/eventController');


    // todoList Routes
    app.route('/events')
        .post(Events.create_an_event);

    app.route('/events/:eventTo')
        .get(Events.list_for_user);

    app.route('/events/:eventId')
        .delete(Events.delete_an_event);
};