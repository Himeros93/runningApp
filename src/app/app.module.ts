import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { ActualiteePage } from '../pages/actualitee/actualitee';
import { MemberListPage } from '../pages/memberList/memberList';
import { MemberPage } from '../pages/member/member';
import { CreateMemberPage } from '../pages/createMember/createMember';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ActualiteePage,
    MemberListPage,
    MemberPage,
    CreateMemberPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ActualiteePage,
    MemberListPage,
    MemberPage,
    CreateMemberPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
