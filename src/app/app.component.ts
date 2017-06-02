import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ActualiteePage } from '../pages/actualitee/actualitee';
import { MemberListPage } from '../pages/memberList/memberList';
import { CreateMemberPage} from '../pages/createMember/createMember';
import { CoursePage } from '../pages/course/course';
import { CreateTeamPage} from '../pages/createTeam/createTeam';
import { TeamListPage } from '../pages/teamList/teamList';
import { SettingsPage } from '../pages/settings/settings';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ActualiteePage;

  pages: Array<{title: string, component: any, droit: string}>;
  
  droit: String;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events) {
    this.initializeApp();
	
	localStorage.setItem('ip', 'http://localhost');
	if(localStorage.droit !== "utilisateur" && localStorage.droit !== "admin"){
		localStorage.setItem('droit', 'utilisateur');
	}
	
	this.droit = localStorage.droit;
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Actualitée', component: ActualiteePage, droit : "utilisateur" },
      { title: 'Chercher membre', component: MemberListPage, droit : "utilisateur" },
      { title: 'Créer un compte', component: CreateMemberPage, droit : "utilisateur" },
      { title: 'Courir', component: CoursePage, droit : "utilisateur" },
      { title: 'Chercher une équipe', component: TeamListPage, droit : "utilisateur" },
      { title: 'Créer une équipe', component: CreateTeamPage, droit : "utilisateur" },
      { title: 'Parametres', component: SettingsPage, droit : "utilisateur" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  menuClosed() {
    this.events.publish('menu:closed', '');
}

menuOpened() {
    this.events.publish('menu:opened', '');
}
}
