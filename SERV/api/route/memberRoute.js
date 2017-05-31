/**
 * Created by A648067 on 23/05/2017.
 */
'use strict';
module.exports = function(app) {
    var Members = require('../controllers/memberController');


    // todoList Routes
    app.route('/members')
        .get(Members.list_all_members)
        .post(Members.create_a_member);

    app.route('/members/:memberPseudo')
        .get(Members.read_a_member);
		
	app.route('/connect/')
        .get(Members.connect_a_member);

    app.route('/members/:memberId')
        .put(Members.update_a_member)
        .delete(Members.delete_a_member);
};