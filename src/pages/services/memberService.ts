/**
 * Created by A648067 on 29/05/2017.
 */
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';

export class MemberService {
  static get parameters() {
    return [[Http]];
  }

  constructor(private http:Http) {

  }

  searchMember(memberPseudo) {
    var url = 'http://localhost:3000/members/' + memberPseudo;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  /*createMember(member) {
   var url = 'http://localhost:3000/members/';
   let body = JSON.stringify(member);
   return this.http.post(url, body).map(res => res.json());
   }*/

  createMember(member){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/members/',
      JSON.stringify(member), {headers})
      .map(res => res.json())
      .subscribe( data => {console.log(data)});
  }

}
