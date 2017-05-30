/**
 * Created by SMELISSON on 24/05/2017.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MemberPage } from '../member/member'

@Component({
  selector: '../teamList/teamList.html',
  templateUrl: 'team.html'
})
export class TeamPage {
  nom: string;
  _createur: any;
  _membres: Array<any>;

  constructor(private navController: NavController, private navParams: NavParams) {
    console.log(navParams);
    this.nom = navParams.get('nom');
    this._createur = navParams.get('_createur');
    this._membres = navParams.get('_membre');
  }

  itemTapped(membre) {
    console.log(membre);
    this.navController.push(MemberPage, {
      pseudo: membre.pseudo,
      nom: membre.nom
    });
  }
}

