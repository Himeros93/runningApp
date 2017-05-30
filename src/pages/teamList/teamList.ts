import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TeamService} from '../services/teamService';
import {TeamPage} from '../team/team';

@Component({
  templateUrl: '../teamList/teamList.html',
  providers: [TeamService]
})

export class TeamListPage {

  teams: Array<any> = [];

  constructor(private navController: NavController, private teamService: TeamService) {

  }

  searchTeams(event) {
    if(event.target.value.length > 2) {
      this.teamService.searchTeam(event.target.value).subscribe(
        data => {
          if(data != null){
            this.teams = data;
            console.log(this.teams);
          }
        },
        err => {
          console.log(err);
        },
        () => console.log('Teams Search Complete')
      );
    }
  }

  itemTapped(team) {
    console.log(team);
    this.navController.push(TeamPage, {
      nom: team.nom,
      _createur: team._createur,
      _membre: team._membre
    });
  }
}
