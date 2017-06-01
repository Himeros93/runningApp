import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MemberService} from '../services/memberService';
import {MemberPage} from '../member/member';
import {ConnectPage} from '../connect/connect';
import { Nav } from 'ionic-angular';

@Component({
  templateUrl: '../memberList/memberList.html',
  providers: [MemberService]
})

export class MemberListPage {

  members: Array<any> = [];
  @ViewChild(Nav) nav: Nav;

  constructor(private navController: NavController, private memberService: MemberService) {

	if (!localStorage.pseudo && !localStorage.token){
		this.navController.setRoot(ConnectPage);
	}
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

  itemTapped(member) {
    console.log('click');
    console.log(member);
    this.navController.push(MemberPage, {
      pseudo: member.pseudo,
      nom: member.nom
    });
  }
}
