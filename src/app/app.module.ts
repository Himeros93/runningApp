import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Events } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { ActualiteePage } from '../pages/actualitee/actualitee';
import { MemberListPage } from '../pages/memberList/memberList';
import { MemberPage } from '../pages/member/member';
import { TeamListPage } from '../pages/teamList/teamList';
import { TeamPage } from '../pages/team/team';
import { CreateMemberPage } from '../pages/createMember/createMember';
import { CoursePage } from '../pages/course/course';
import { ConnectPage } from '../pages/connect/connect';
import { CreateTeamPage } from '../pages/createTeam/createTeam';
import { SelectMemberModal } from '../pages/createTeam/selectMemberModal';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ActualiteePage,
    MemberListPage,
    MemberPage,
    TeamListPage,
    TeamPage,
    CreateMemberPage,
	CoursePage,
	ConnectPage,
    CreateTeamPage,
	SettingsPage,
    SelectMemberModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ActualiteePage,
    MemberListPage,
    MemberPage,
    TeamListPage,
    TeamPage,
    CreateMemberPage,
	CoursePage,
	ConnectPage,
    CreateTeamPage,
	SettingsPage,
    SelectMemberModal,
  ],
  providers: [
    StatusBar,
    SplashScreen,
	SpinnerDialog,
	GoogleMaps,
	Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
