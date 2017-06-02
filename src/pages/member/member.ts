import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MemberService} from '../services/memberService';

@Component({
  selector: '../memberList/memberList.html',
  templateUrl: 'member.html',
  providers: [MemberService]
})
export class MemberPage {
  id: number;
  pseudo: string;
  member: any;

  constructor(private navController: NavController, private navParams: NavParams, private memberServce : MemberService) {
    this.id = navParams.get('id');
    this.pseudo = navParams.get('pseudo');
    this.memberServce.getMember(this.id).subscribe(
      data => {
        this.member = data;
        console.log(this.member);
      },
      err => {
        console.log(err);
      }
    )
  }
}
