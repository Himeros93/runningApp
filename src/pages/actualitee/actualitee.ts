import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ConnectPage} from '../connect/connect';

@Component({
  selector: 'page-actualitee',
  templateUrl: 'actualitee.html'
})
export class ActualiteePage {

  constructor(public navCtrl: NavController) {
	if (!localStorage.pseudo && !localStorage.token){
		this.navCtrl.setRoot(ConnectPage);
	}
  }

}
