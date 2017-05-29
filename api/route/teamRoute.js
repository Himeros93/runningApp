/**
 * Created by A648067 on 23/05/2017.
 */
'use strict';
module.exports = function(app) {
    var Teams = require('../controllers/teamController');


    // todoList Routes
    app.route('/teams')
        .get(Teams.list_all_teams)
        .post(Teams.create_a_team);


    app.route('/teams/:teamId')
        .get(Teams.read_a_team)
        .put(Teams.update_a_team)
        .delete(Teams.delete_a_team);
};