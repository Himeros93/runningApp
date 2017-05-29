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
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import * as io from 'socket.io-client';

import {Component, AfterViewInit} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'coursePage',
  templateUrl: 'course.html'
})

export class CoursePage implements AfterViewInit{
 constructor(private googleMaps: GoogleMaps, private geolocation: Geolocation, private locationAccuracy: LocationAccuracy) {}
 

// Load map only after view is initialized
ngAfterViewInit() {
 this.loadMap();
}

loadMap() {
 // make sure to create following structure in your view.html file
 // and add a height (for example 100%) to it, else the map won't be visible
 // <ion-content>
 //  <div #map id="map" style="height:100%;"></div>
 // </ion-content>

 // create a new map by passing HTMLElement
 var socket = io('http://localhost:8080');
 let element: HTMLElement = document.getElementById('map');

 let map: GoogleMap = this.googleMaps.create(element);
 
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
	this.locationAccuracy.canRequest().then((canRequest: boolean) => {

		if(canRequest) {
			// the accuracy option will be ignored by iOS
			this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
				() => console.log('Request successful'),
				error => console.log('Error requesting location permissions', error)
			);
		}

	});
	this.geolocation.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude
 alert(resp);
}).catch((error) => {
  console.log('Error getting location', error);
});
 let watch = this.geolocation.watchPosition();
	watch.subscribe((data) => {
		myPosition = new LatLng(data.coords.latitude, data.coords.longitude);
		position.target = myPosition;
		map.moveCamera(position);
		myMarkers[0].setPosition(myPosition);
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