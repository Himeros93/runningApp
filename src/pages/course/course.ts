import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import * as io from "socket.io-client";
import { Storage } from '@ionic/storage';

import {Component, AfterViewInit} from '@angular/core';
import {NavController, Events} from 'ionic-angular';
import {ConnectPage} from '../connect/connect';

@Component({
  selector: 'coursePage',
  templateUrl: 'course.html'
})

export class CoursePage implements AfterViewInit{
 constructor(private googleMaps: GoogleMaps, private geolocation: Geolocation, private storage: Storage, private navCtrl: NavController, public events: Events) {
	 if (!localStorage.pseudo && !localStorage.token){
		this.navCtrl.setRoot(ConnectPage);
	}
 }
 
 socket: any;
 map: GoogleMap;
 testMap: boolean;
 parcours: Array<Marker> = [];

// Load map only after view is initialized
ngAfterViewInit() {
	
	this.loadMap(localStorage.token, localStorage.pseudo);
	this.testMap = true
}

toggle(){
	this.testMap = !this.testMap;
	this.map.setClickable(this.testMap);
}

construct(){
	this.map.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(
		data => {
			let markerOptions: MarkerOptions = {
				position: data,
				title: "Point " + this.parcours.length,
				icon: {url: './assets/img/flag.png'}
			};
			
		}
	);
}

loadMap(token, pseudo) {
 // make sure to create following structure in your view.html file
 // and add a height (for example 100%) to it, else the map won't be visible
 // <ion-content>
 //  <div #map id="map" style="height:100%;"></div>
 // </ion-content>

 
this.socket = io(localStorage.ip + localStorage.socketPort, {query : 'pseudo=' + pseudo});
this.socket.on('test', () => {
	alert("La socket est connectée!");
});
this.socket.on('pos', (pos, nom) => {
	var test = true;
	myMarkers.forEach(function(marker){
		if(marker.getTitle() === nom && localStorage.pseudo !== nom){
			test = false;
			marker.setPosition(pos);
		}
	});
	if(test){
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
		if(marker.getTitle() === 'moi'){
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