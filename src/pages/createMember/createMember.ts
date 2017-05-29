/**
 * Created by Slvnm on 25/05/2017.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MemberService} from '../services/memberService';

@Component({
  providers: [MemberService],
  templateUrl: 'createMember.html'
})

export class CreateMemberPage {
  member = { pseudo: '',
             nom: '',
             email: '',
             mdp: ''
           };

  constructor(private navController: NavController, private memberService: MemberService) {

  }

  valideForm(){
    this.memberService.createMember(this.member);
  }

}
