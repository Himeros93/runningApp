/**
 * Created by A648067 on 02/06/2017.
 */
/**
 * Created by A648067 on 29/05/2017.
 */
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';

export class CourseHistService {
  static get parameters() {
    return [[Http]];
  }

  constructor(private http:Http) {

  }

  getCoursesHist(courseHistId) {
    var url = 'http://localhost:3000/coursesHist/' + courseHistId;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  searchCoursesHist(courseHistId) {
    var url = 'http://localhost:3000/coursesHist/min/' + courseHistId;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  createCoursesHist(courseHist){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/coursesHist/',
      JSON.stringify(courseHist), {headers})
      .map(res => res.json())
      .subscribe( data => {console.log(data)});
  }

}
