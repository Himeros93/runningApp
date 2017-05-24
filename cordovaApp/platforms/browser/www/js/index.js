/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
//variables globales
var map = null;
var markers = [];
var geoPosition = null;
var socket = null;
var state = null;
var parcours  = [];
var parcoursLine = [];

//application et sa logique
var app = {
    // Application Constructor
    initialize: function() {
		
		//instanciation d'un id aleatoire
		if(!sessionStorage.getItem("socket")){
			sessionStorage.setItem("socket", Math.random());
		}
		console.log(sessionStorage.getItem("socket"));
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		
		//gestion des sockets coté client
		socket = io.connect("http://localhost:8080", {transports:['websocket'], query: 'id='+ sessionStorage.getItem("socket")});
		socket.on("status", function(data){ //affichage des messages d'erreur ou de connexion
			alert(data);
		});
		socket.on("updatePos", function(data){ //mise à jour des marqueurs sur la carte
			console.log("Mise à jour d'une position.");
			var dataConvert = data;
			var found = false;
			for(var i = 0; i < markers.length; i++){
				if(dataConvert.sock === markers[i].socket){
					found = true;
					markers[i].marker.setPosition(new google.maps.LatLng(dataConvert.position[0], dataConvert.position[1]));
					console.log("Le marqueur existe, mise à jour de la position.");
				}
			}
			if(!found){
				markers.push({socket: dataConvert.sock, marker: new google.maps.Marker({position: new google.maps.LatLng(dataConvert.position[0], dataConvert.position[1]), map: map}) });
				console.log("Le marqueur n'existe pas: création.");
			}
		});
        socket.on("createParcours", function(data){
            for(var i = 0; i < data.length; i++){
                parcours.push(new google.maps.Marker({position: new google.maps.LatLng(data[i].lat, data[i].lng), icon: "img/running.png", map: map}));
                if(parcours.length > 1){
                    parcoursLine.push(new google.maps.Polyline({
                        path: [
                            parcours[parcours.length -1].getPosition(), 
                            parcours[parcours.length -2].getPosition()
                        ],
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.6,
                        strokeWeight: 10,
                        map: map
                    }));
                }
            }
        });

        socket.on("listRoom", function(data){
            data.forEach(function(room){
                $(".listRoom").append("<option value=' + " + room.nom + "'>Room "+ room.nom +" de la team " + room.equipes + "</option>");
            })
        });
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.initMap();
    },
    initMap: function(){
        var div = document.getElementById("map");
        map = new google.maps.Map(div, {
            center: {lat: 0, lng: 0},
            zoom: 20,
            disableDefaultUI: true
        });
		function onSuccess(position) {
           geoPosition = position;
            map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            
        };
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);  
    },
	
	//suppression de tous les marqueurs d'un array sur la map
    deleteMarkers: function(markerList){
        for (var i = 0; i < markerList.length; i++) {
          markerList[i].setMap(null);
        }
        markerList = [];
    }

};



//mise à jour de la position de l'utilisateur
function updatePosition(){
  var onSuccess = function(position) {
			geoPosition = position;
            map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            socket.emit("updatePosition", [position.coords.latitude, position.coords.longitude]);
        };
        var onError = function(error) {
            alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

//mise à jour de la position de l'utilisateur avec valeurs aleatoires
function updatePositionAlea(){
  var onSuccess = function(position) {
			geoPosition = position;
            var lat = Math.random().toFixed(3) /100;
            var long = Math.random().toFixed(3) / 100;
            console.log(lat + ' ' + long);
            map.setCenter(new google.maps.LatLng(position.coords.latitude + lat, position.coords.longitude + long));
            socket.emit("updatePosition", [position.coords.latitude + lat, position.coords.longitude + long]);
        };
        var onError = function(error) {
            alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

//fonction de création de parcours customisé
function createState(){
    if(state != null){
        google.maps.event.clearListeners(map, 'click');
        $(".map").css({"cursor": "pointer"});
        $(".create").text("Créer parcours");
        state = null;
        if(parcours.length > 1){
            var parcoursCoord = [];
            for(var i = 0; i < parcours.length; i++){
                parcoursCoord.push({lat: parcours[i].getPosition().lat(), lng: parcours[i].getPosition().lng()});
            }
            socket.emit("createParcours", parcoursCoord);
        }
        app.deleteMarkers(parcours);
        parcours = [];
        app.deleteMarkers(parcoursLine);
        parcoursLine = [];
    } else{
        app.deleteMarkers(parcours);
        parcours = [];
        app.deleteMarkers(parcoursLine);
        parcoursLine = [];
        $(".create").text("Sauvegarder parcours");
        state = "create";
        $(".map").css({"cursor": "crosshair"});
        map.addListener("click", function(event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            // populate yor box/field with lat, lng
            parcours.push(new google.maps.Marker({position: new google.maps.LatLng(lat, lng), icon: "img/running.png", map: map}));
            if(parcours.length > 1){
                parcoursLine.push(new google.maps.Polyline({
                    path: [
                        new google.maps.LatLng(lat, lng), 
                        parcours[parcours.length -2].getPosition()
                    ],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.6,
                    strokeWeight: 10,
                    map: map
                }));
            }
        });
    }
}

function Login(){
    socket.emit("login", "test", "test");
}

function createRoom(){
    socket.emit("createRoom", null);
}

function joinRoom(){
    socket.emit("joinRoom", $(".listRoom").val());
}

app.initialize();