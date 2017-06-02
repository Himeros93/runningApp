/**
 * Created by SMELISSON on 02/06/2017.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CourseHistService} from '../services/courseHistService';
import { MemberPage } from '../member/member';

@Component({
  selector: '../team/team.html',
  templateUrl: 'courseHist.html',
  providers: [CourseHistService]
})
export class CourseHistPage {
  id: number;
  nom: string;
  courseHist: any;

  constructor(private navController: NavController, private navParams: NavParams, private memberServce : CourseHistService) {
    this.id = navParams.get('id');
    this.nom = navParams.get('nom');
    this.memberServce.getCoursesHist(this.id).subscribe(
      data => {
        this.courseHist = data;
        console.log(this.courseHist);
      },
      err => {
        console.log(err);
      }
    )
  }

  memberTapped(membre) {
    console.log(membre);
    this.navController.push(MemberPage, {
      id: membre._id,
      pseudo: membre.pseudo
    });
  }
}

