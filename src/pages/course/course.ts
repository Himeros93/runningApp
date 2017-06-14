import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker,
 Polyline
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import * as io from "socket.io-client";
import { Storage } from '@ionic/storage';

import {Component, AfterViewInit} from '@angular/core';
import {NavController, Events, AlertController, FabContainer} from 'ionic-angular';
import {ConnectPage} from '../connect/connect';

@Component({
  selector: 'coursePage',
  templateUrl: 'course.html'
})

export class CoursePage implements AfterViewInit{
 constructor(private googleMaps: GoogleMaps, private geolocation: Geolocation, private storage: Storage, private navCtrl: NavController, public events: Events, public alertCtrl: AlertController) {
	 if (!localStorage.pseudo && !localStorage.token){
		this.navCtrl.setRoot(ConnectPage);
	}
 }
 
 socket: any;
 map: GoogleMap;
 testMap: boolean;
 parcours: Array<Marker> = [];
 parcoursLines: Array<any> = [];

// Load map only after view is initialized
ngAfterViewInit() {
	
	this.loadMap(localStorage.token, localStorage.pseudo);
	this.testMap = true
}

toggle(){
	this.testMap = !this.testMap;
	this.map.setClickable(this.testMap);
}

construct(fab: FabContainer){
	alert("Mode construction de parcours");
	fab.close();
	this.toggle();
	this.map.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(
		data => {
			let markerOptions: MarkerOptions = {
				position: data,
				title: "Point " + this.parcours.length,
				icon: {url: './assets/img/flag.png'}
			};
			this.map.addMarker(markerOptions).then((marker: Marker) => {
				this.parcours.push(marker);
				marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {this.showConfirm(marker);});
				if(this.parcours.length > 1){
					var coordi1: number;
					var coordi2: number;
					var coordi3: number;
					var coordi4: number;
					var map = this.map;
					var app = this;
					this.parcours[this.parcours.length - 2].getPosition().then(function(coord){coordi1 = coord.lat; coordi2 = coord.lng;});
					marker.getPosition().then(function(coord){
						coordi3 = coord.lat;
						coordi4 = coord.lng;
						map.addPolyline({points: [new LatLng(coordi1, coordi2), new LatLng(coordi3, coordi4)], 'color' : "red", "width" : 10, 'zIndex': 3}).then((polyline: Polyline) =>{
							app.parcoursLines.push(polyline);
						});
					});
				}
				
			});
		}
	);
}
showConfirm(marker) {
   this.toggle();
   let confirm = this.alertCtrl.create({
     title: 'Effacer ce point?',
     message: 'Etes vous sur de vouloir supprimer ce marqueur?',
     buttons: [
       {
         text: 'Non',
         handler: () => {
           console.log('Suppression annulée.');
		   this.toggle();
         }
       },
       {
         text: 'Oui',
         handler: () => {
			console.log('Suppression du marqueur.');
			
			if(this.parcours.indexOf(marker) !== this.parcours.length -1){
				this.parcoursLines[this.parcours.indexOf(marker)].remove();
				this.parcoursLines.splice(this.parcours.indexOf(marker), 1);
			}
			if(this.parcours.indexOf(marker) !== 0){
				this.parcoursLines[this.parcours.indexOf(marker) - 1].remove();
				this.parcoursLines.splice(this.parcours.indexOf(marker) - 1, 1);
				if(this.parcours.indexOf(marker) !== this.parcours.length -1){
					var point1Lat : number;
					var point1Lng : number;
					var point2Lat : number;
					var point2Lng : number;
					var map = this.map;
					var app = this;
					this.parcours[this.parcours.indexOf(marker) - 1].getPosition().then(function(latLng) {point1Lat = latLng.lat; point1Lng = latLng.lng;});
					this.parcours[this.parcours.indexOf(marker) + 1].getPosition().then(function(latLng) {point2Lat = latLng.lat; point2Lng = latLng.lng;
						map.addPolyline({points: [new LatLng(point1Lat, point1Lng), new LatLng(point2Lat, point2Lng)], 'color' : "red", "width" : 10, 'zIndex': 3}).then((polyline: Polyline) =>{
							app.parcoursLines.splice(app.parcours.indexOf(marker) - 1, 0, polyline);
						});
					});
				}
			}
			this.parcours.splice(this.parcours.indexOf(marker), 1);
			marker.remove();
			this.toggle();
         }
       }
     ]
   });
   confirm.present();
 }
 
loadMap(token, pseudo) {
 // make sure to create following structure in your view.html file
 // and add a height (for example 100%) to it, else the map won't be visible
 // <ion-content>
 //  <div #map id="map" style="height:100%;"></div>
 // </ion-content>

 
this.socket = io(localStorage.ip + ':' + localStorage.socketPort, {query : 'pseudo=' + pseudo});
this.socket.on('test', () => {
	alert("La socket est connectée!");
});
this.socket.on('pos', (pos, nom) => {
	var test = false;
	myMarkers.forEach(function(marker){
		if(marker.getTitle() === nom && localStorage.pseudo !== nom){
			test = true;
			marker.setPosition(pos);
		}
	});
	if(!test && localStorage.pseudo !== nom){
		let markerOptions: MarkerOptions = {
			position: pos,
			title: nom,
			icon: {url: './assets/img/runner.png'}
		};
		map.addMarker(markerOptions).then((marker: Marker) => {
			myMarkers.push(marker);
		});
	}
});
 
 
 // create a new map by passing HTMLElement
 let element: HTMLElement = document.getElementById('map');

 this.map = this.googleMaps.create(element);
 var map = this.map;
 
 this.events.subscribe('menu:opened', () => {
    map.setClickable(false);
});

this.events.subscribe('menu:closed', () => {
	
    map.setClickable(this.testMap);
});


 
  var myPosition: LatLng = new LatLng(48.8566140, 2.3522220);

 // listen to MAP_READY event
 // You must wait for this event to fire before adding something to the map or modifying it in anyway
 map.one(GoogleMapsEvent.MAP_READY).then(
   () => {
     console.log('Map is ready!');
     // Now you can add elements to the map like the marker
	 map.addMarker(markerOptions).then((marker: Marker) => {
      myMarkers.push(marker);
	  console.log(marker);
    });
	
 let watch = this.geolocation.watchPosition();
	watch.subscribe((data) => {
		myPosition = new LatLng(data.coords.latitude, data.coords.longitude);
		position.target = myPosition;
		myMarkers.forEach(function(marker){
		if(marker.getTitle() === 'Moi'){
			marker.setPosition(myPosition);
		}
	});
		this.socket.emit("position", myPosition);
	}, err => {
		console.log(err);
    });
   }
 );

 let position: CameraPosition = {
   target: myPosition,
   zoom: 18,
   tilt: 30
 };
 
 // move the map's camera to position
 map.moveCamera(position);

 // create new marker
 let markerOptions: MarkerOptions = {
   position: new LatLng(48.8566140, 2.3522220),
   title: 'Moi',
   icon: {url: './assets/img/runner.png'}
 };

 var myMarkers: Array<Marker> = [];
 }
 


}