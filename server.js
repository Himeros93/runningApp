var portSocket = 8080;
var socketList = [];

//init Express
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Members = require('./api/models/memberModel'),
    Teams = require('./api/models/teamModel'),
    Parcours = require('./api/models/parcoursModel'),
    Courses = require('./api/models/courseModel'),
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

app.listen(port);

console.log('app RESTful API server started on: ' + port);



// debut de simulation de la base de données
var room = [];
function rooms(team){
	return {nom: Math.random(), equipes: team};
};
var equipe = [];
function equipes(name, participants){
	return {id: Math.random(), nom: name, users: [participants]};
};
var user = [{nom: "test", pass: "test", team: []}];
function users(pseudo, mdp){
	return{nom: pseudo, pass: mdp, team: []};
};
//fin de la simulation de la base de données




var io = require('socket.io')(portSocket);
console.log("Serveur demarré au port: " + portSocket);
io.on('connection', function (socket) {
	var test = false;
	console.log(socket.handshake.query.id);
	for(var i = 0; i < socketList.length; i++){
		if(socketList[i].id === socket.handshake.query.id){
			test = true;
			socketList[i].sock = socket;
			console.log("Utilisateur reconnecté.");
		}
	}
	if(test === false){
		socketList.push({id: socket.handshake.query.id, sock: socket, position: [0, 0], pseudo: null});
		console.log("Utilisateur connecté.");
		socket.emit('status', "Connecté!");
	}

	//login d'un utilisateur et association de la session à son pseudo
	socket.on("login", function(pseudo, pass){
		console.log("tentative de login avec " + pseudo + " " + pass);
		var test = false;
		for(var i = 0; i < user.length; i++){
			if(user[i].nom === pseudo && user[i].pass === pass){
				test = true;
			}
		}
		if(test){
			socket.emit("status", "Vous vous etes loggé.");
			for(var i = 0; i < socketList.length; i++){
				if(socketList[i].id === socket.handshake.query.id){
					socketList[i].pseudo = pseudo;
				}
			}
		} else {
			socket.emit("status", "Erreur dans le pseudo ou mot de passe.");
		}
	});


	socket.on("addToTeam", function(nom, team){
		if(isConnected(socket)){
			if(isOfTeam(socket, nameFromSockets(socket), team)){
				if(!isOfTeam(socket, nom, team)){
					addToTeam(nom, team);
					socket.emit("status", "L'utilisateur a été ajouté à l'equipe!");
				}else {
					socket.emit("status", "L'utilisateur fait deja parti de l'equipe.");
				}
			} else{
				socket.emit("status", "Vous ne faites pas partie de l'equipe.");
			}
		}
	});

	//envoie de la position d'un utilisateur à tous les utilisateurs
	socket.on("updatePosition", function(pos){
		var y = -1;
		console.log("Demarrage update position");
		for(var i = 0; i < socketList.length; i++){
			console.log(i);
			if(socketList[i].sock === socket){
				y = i;
			}
		}
		if(y != -1){
			socketList[y].position = pos;
			var dataToSend = {sock: socketList[y].id, position: socketList[y].position};
			socket.broadcast.emit("updatePos", dataToSend);
			socket.emit("updatePos", dataToSend);
		}else{
			socket.emit("status", "Une erreur est survenue. Vous n'etes pas reconnu par le serveur. Tentez d'actualiser la page.");
		}
  });

  //lors de la creation d'un parcours
  socket.on("createParcours", function(parcours){
	  var taille = 0;
	  for(var i = 1; i < parcours.length; i++){
		taille += getDistInKm(parcours[i-1].lat, parcours[i-1].lng, parcours[i].lat, parcours[i].lng);
	  }
	  console.log("Parcours de " + taille.toFixed(3) + " km envoyé!");
	  socket.emit('status', "Le parcours de " + taille.toFixed(3) + " km a été envoyé.");
	  socket.broadcast.emit("createParcours", parcours);
  });
  //lors de la demande de creation de room avec ou sans team
socket.on("createRoom", function(data){
	if(isConnected(socket)){
		if(data !== null){
			if(isOfTeam(socket, nameFromSockets(socket), data)){
				console.log("data est null");
				createRoom(data);
			}
		} else {
			console.log(nameFromSockets(socket));
			createTeam(nameFromSockets(socket), nameFromSockets(socket));
			createRoom(nameFromSockets(socket));
		}
	}
	console.log(room);
	socket.broadcast.emit("listRoom", room);
	socket.emit("listRoom", room);
});

//un utilisateur tente de rejoindre une room
socket.on("joinRoom", function(data){
	if(teamFromRoom(data) && isOfTeam(socket, nameFromSockets(socket), teamFromRoom(data))){
		socket.emit("status", "Vous faites partie de la room d'id " + data);
		socket.join(data);
	}
});
});





//creer une room
function createRoom(nomTeam){
	room.push(rooms(nomTeam));
}

//creer une equipe
function createTeam(nom, nomTeam){
	equipe.push(equipes(nomTeam, nom));
	for(var i = 0; i < user.length; i++){
		if(user[i].nom === nom){
			user[i].team.push(nomTeam);
		}
	}
}

//recuperer la team d'une room
function teamFromRoom(nomRoom){
	room.forEach(function(salle){
		if(salle.id === nomRoom){
			return salle.team;
		} 
	});
	return null;
}


//recuperer le pseudo d'une socket
function nameFromSockets(socket){
	for(var i = 0; i < socketList.length; i++){
		if(socketList[i].id === socket.handshake.query.id){
			return socketList[i].pseudo;
		}
	}
}

//verifier que l'utilisateur est connecté
function isConnected(socket){
	for(var i = 0; i < socketList.length; i++){
		if(socketList[i].id === socket.handshake.query.id){
			if(socketList[i].pseudo){
				return true;
			} else {
				socket.emit("status", "Veuillez vous connecter.");
				return false;
			}
		}
	}
	socket.emit("status", "Une erreur inconnue est survenue.");
	return false;
}


//verifie si l'utilisateur fait partie de l'equipe
function isOfTeam(socket, nom, nomTeam){
	for(var j = 0; j < equipe.length; j++){
		if(equipe[j].nom === nomTeam){
			for(var k = 0; k < equipe[j].participants.length; k++){
				if(equipe[j].participants[k] === nom){
					return true;
				}
			}
			return false;
		}
	}
	socket.emit("status", "Aucune equipe de ce nom n'existe.");
	return false;
}


//ajouter utilisateur à l equipe
function addToTeam(nom, team){
	for(var j = 0; j < equipe.length; j++){
		if(equipe[j].nom === team){
			equipe[j].participants.push(nom);
			for(var i = 0; i < user.length; i++){
				if(user[i].nom === nom){
					user[i].team.push(team);
				}
			}
		}
	}
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
