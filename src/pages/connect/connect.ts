/**
 * Created by Slvnm on 25/05/2017.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MemberService} from '../services/memberService';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Component({
  providers: [MemberService],
  templateUrl: 'connect.html'
})

export class ConnectPage {
  member = { pseudo: '',
             mdp: '',
             token: ''
           };

  constructor(private navController: NavController, private memberService: MemberService, private dialog: SpinnerDialog) {
	this.member.token = this.random32bit();
  }

  valideForm(){
	  
    this.memberService.connectMember(this.member, this.dialog, this.navController);
  
  }
  random32bit() {
    let u = new Uint32Array(1);
    window.crypto.getRandomValues(u);
    let str = u[0].toString(16).toUpperCase();
    return '00000000'.slice(str.length) + str;
}
}
