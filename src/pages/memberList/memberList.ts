import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MemberService} from '../services/memberService';
import {MemberPage} from '../member/member';

@Component({
  templateUrl: '../memberList/memberList.html',
  providers: [MemberService]
})

export class MemberListPage {

  members: Array<any> = [];

  constructor(private navController: NavController, private memberService: MemberService) {

  }

  searchMembers(event) {
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

  itemTapped(member) {
    console.log(member);
    this.navController.push(MemberPage, {
      pseudo: member.pseudo,
      nom: member.nom
    });
  }
}
