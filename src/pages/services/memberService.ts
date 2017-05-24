import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

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
}
