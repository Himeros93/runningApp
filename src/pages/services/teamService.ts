/**
 * Created by A648067 on 29/05/2017.
 */
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';

export class TeamService {
  static get parameters() {
    return [[Http]];
  }

  constructor(private http:Http) {

  }

  searchTeam(teamName) {
    var url = localStorage.ip + ':3000/teams/' + teamName;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  createTeam(team){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      localStorage.ip + ':3000/teams/',
      JSON.stringify(team), {headers})
      .map(res => res.json())
      .subscribe( data => {console.log(data)});
  }

}
