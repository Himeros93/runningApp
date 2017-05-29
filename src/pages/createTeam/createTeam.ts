/**
 * Created by A648067 on 29/05/2017.
 */
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { TeamService } from '../services/teamService';
import { SelectMemberModal } from './selectMemberModal';

@Component({
  providers: [TeamService],
  templateUrl: 'createTeam.html'
})

export class CreateTeamPage {
    team = { nom: '',
    _createur: '',
    _membre: []
  };
    members : Array<any> = [] ;

  constructor(private navController: NavController, private teamService: TeamService, private modalController: ModalController) {

  }

  openModal() {
    let modal = this.modalController.create(SelectMemberModal);
    modal.onDidDismiss(data => {
      for(var member in data) {
        this.members.push(data[member]);
      }
    });
    modal.present();
  }

  valideForm(){
    this.team._createur = this.members[0];

    for(var member in this.members){
      this.team._membre.push(this.members[member]._id);
    }
    console.log(this.team);

    this.teamService.createTeam(this.team);
  }

}
