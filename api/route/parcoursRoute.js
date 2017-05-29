/**
 * Created by SMELISSON on 23/05/2017.
 */
'use strict';
module.exports = function(app) {
    var Parcours = require('../controllers/parcoursController');

    app.route('/parcours')
        .get(Parcours.list_all_parcours)
        .post(Parcours.create_a_parcours);


    app.route('/parcours/:parcoursId')
        .get(Parcours.read_a_parcours)
        .put(Parcours.update_a_parcours)
        .delete(Parcours.delete_a_parcours);
};