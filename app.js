/**
 * Created by A648067 on 22/05/2017.
 */
//init Express
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Members = require('./api/models/memberModel'),
    Teams = require('./api/models/teamModel'),
    Parcours = require('./api/models/parcoursModel'),
    Courses = require('./api/models/courseModel'),
	Events = require('./api/models/eventModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/appDB');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var memberRoute = require('./api/route/memberRoute');
memberRoute(app);

var teamRoute = require('./api/route/teamRoute');
teamRoute(app);

var parcoursRoute = require('./api/route/parcoursRoute');
parcoursRoute(app);

var courseRoute = require('./api/route/courseRoute');
courseRoute(app);

var eventRoute = require('./api/route/eventRoute');
eventRoute(app);

app.listen(port);

console.log('app RESTful API server started on: ' + port);