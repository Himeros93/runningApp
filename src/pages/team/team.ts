/**
 * Created by SMELISSON on 24/05/2017.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MemberPage } from '../member/member';
import  { CourseHistPage } from '../courseHist/courseHist';
import {TeamService} from "../services/teamService";

@Component({
  selector: '../teamList/teamList.html',
  templateUrl: 'team.html',
  providers: [TeamService]
})
export class TeamPage {
  id: number;
  nom: string;
  _createur: any;
  team : any;


  constructor(private navController: NavController, private navParams: NavParams, private teamService : TeamService) {
    //this.team._membres = [];
    this.nom = navParams.get('nom');
    this._createur = navParams.get('createur');
    this.id = navParams.get('id');

    this.teamService.getTeam(this.id).subscribe(
      data => {
        this.team = data;
        console.log(this.team);
      },
      err => {
        console.log(err);
      })
  }

  memberTapped(membre) {
    console.log(membre);
    this.navController.push(MemberPage, {
      id: membre._id,
      pseudo: membre.pseudo
    });
  }

  courseHistTapped(courseHist) {
    console.log(courseHist);
    this.navController.push(CourseHistPage, {
      id: courseHist._id,
      nom: courseHist.nom
    });
  }
}

