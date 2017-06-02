/**
 * Created by Slvnm on 25/05/2017.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActualiteePage } from '../actualitee/actualitee';

@Component({
  templateUrl: 'settings.html'
})

export class SettingsPage {
  adresse = { 
				ip: '',
				socketPort: ''
			};

  constructor(private navController: NavController) {
	
  }

  valideForm(){
	localStorage.setItem("ip", this.adresse.ip);
	localStorage.setItem("socketPort", this.adresse.socketPort);
	alert("Validé.");
	this.navController.setRoot(ActualiteePage);
  }
}
