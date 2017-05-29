import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: '../memberList/memberList.html',
  templateUrl: 'member.html'
})
export class MemberPage {
  pseudo: string;
  nom: string;

  constructor(private navController: NavController, private navParams: NavParams) {
    this.pseudo = navParams.get('pseudo');
    this.nom = navParams.get('nom');
  }
}
