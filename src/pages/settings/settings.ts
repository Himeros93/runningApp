/**
 * Created by Slvnm on 25/05/2017.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'settings.html'
})

export class ConnectPage {
  adresse = { ip: ''};

  constructor(private navController: NavController) {
	
  }

  valideForm(){
	localStorage.setItem("ip", this.adresse.ip);
  }
}
