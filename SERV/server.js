var portSocket = 8080;
var socketList = [];

//init Express
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Parcours = require('./api/models/parcoursModel'),
    Rooms = require('./api/models/roomModel')
    Members = require('./api/models/memberModel'),
    Teams = require('./api/models/teamModel'),
    Courses = require('./api/models/courseModel'),
    Events = require('./api/models/eventModel'),
    bodyParser = require('body-parser');


//serveur Mongoose
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

var db = mongoose.connection;


//serveur websocket
var io = require('socket.io')(portSocket);
console.log("Serveur demarré au port: " + portSocket);


//gestion des sockets à partir d'ici
io.on('connection', function (socket) {
    var test = false;
    socket.emit('test');
    console.log(socket.handshake.query.pseudo);
    for (var i = 0; i < socketList.length; i++) {
        if (socketList[i].pseudo === socket.handshake.query.pseudo) {
            test = true;
            socketList[i].sock = socket;
            console.log("Utilisateur reconnecté.");
        }
    }
    if (test === false) {
        socketList.push({pseudo: socket.handshake.query.pseudo, sock: socket, position: [0, 0]});
        console.log("Utilisateur connecté.");
        socket.emit('status', "Connecté!");
    }
	
	socket.on("position", function (pos) {
		socket.broadcast.emit("pos", pos, socket.handshake.query.pseudo);
	}

    //envoie de la position d'un utilisateur à tous les utilisateurs
    socket.on("updatePosition", function (pos) {
        var y = -1;
        console.log("Demarrage update position");
        for (var i = 0; i < socketList.length; i++) {
            console.log(i);
            if (socketList[i].sock === socket) {
                y = i;
            }
        }
        if (y != -1) {
            socketList[y].position = pos;
            var dataToSend = {sock: socketList[y].pseudo, position: socketList[y].position};
            socket.broadcast.emit("updatePos", dataToSend);
            socket.emit("updatePos", dataToSend);
        } else {
            socket.emit("status", "Une erreur est survenue. Vous n'etes pas reconnu par le serveur.");
        }
    });

    //un utilisateur tente de rejoindre une room
    socket.on("joinRoom", function (data) {


    });

});

//verifier que l'utilisateur est connecté
function isConnected(socket){
	for(var i = 0; i < socketList.length; i++){
		if(socketList[i].pseudo === socket.handshake.query.pseudo){
			return true;
        }
	}
	socket.emit("status", "Une erreur inconnue est survenue.");
	return false;
}


//utilitaire pour calculer la distance entre deux coordonnées gps (en km)
function getDistInKm(lat1,lon1,lat2,lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

function deg2rad(Value) {
	return Value * Math.PI / 180;
}
