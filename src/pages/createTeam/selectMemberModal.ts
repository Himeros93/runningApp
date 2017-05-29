/**
 * Created by A648067 on 29/05/2017.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MemberService } from '../services/memberService';
import { ViewController } from 'ionic-angular';

@Component({
  providers: [MemberService],
  templateUrl: 'selectMemberModal.html'
})

export class SelectMemberModal {

  members: Array<any> = [];
  membersToAdd: Array<any> = [];

  constructor(private navController: NavController, private memberService: MemberService, public viewCtrl: ViewController) {

  }

  searchMembers(event, key) {
    if(event.target.value.length > 2) {
      this.memberService.searchMember(event.target.value).subscribe(
        data => {
          if(data != null){
            this.members = data;
            console.log(this.members);
          }
        },
        err => {
          console.log(err);
        },
        () => console.log('Members Search Complete')
      );
    }
  }

  addMember(member){
    this.membersToAdd.push(member);
    console.log(this.membersToAdd);
  }

  send() {
    let data = this.membersToAdd;
    console.log('liste complète');
    this.viewCtrl.dismiss(data);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
