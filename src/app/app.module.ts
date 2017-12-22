import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NotesPage } from '../pages/notes/notes';
import { PayementsPage } from '../pages/payements/payements';
import { MessagesPage } from '../pages/messages/messages';
import { TabMenuPage } from '../pages/tab-menu/tab-menu';
import { AbsensesPage } from '../pages/absenses/absenses';
import { AbsensesDetailsPage } from '../pages/absenses/absensesDetails';
import { ConnexionPage } from '../pages/connexion/connexion';
import { ProfilePage } from '../pages/profile/profile';
import { StudentsPage } from '../pages/students/students';
import { MatierePage } from '../pages/matiere/matiere';
import { ContenuMessagePage } from '../pages/contenu-message/contenu-message';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { CommonSharedModule } from './common.shared.module';
import { SchoolingService } from './services/schooling.service';
import { UserService } from './services/user.service';
import { BaseService } from './services/base.service';
import { ExamService } from './services/exam.service';
import { StudentService } from './services/student.service';
import { GlobalEventsManager } from './services/globalEventsManager';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    NotesPage,
    PayementsPage,
    MessagesPage,
    TabMenuPage,
    AbsensesPage,
    ConnexionPage,
    ProfilePage,
    MatierePage,StudentsPage,
    ContenuMessagePage,
    ConfigurationPage,
    AbsensesDetailsPage
  ],
  imports: [
     BrowserModule, CommonSharedModule,IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotesPage,
    PayementsPage,
    MessagesPage,
    TabMenuPage,
    AbsensesPage,
    ConnexionPage,
    ProfilePage,
    MatierePage,StudentsPage,
    ContenuMessagePage,
    ConfigurationPage,
    AbsensesDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    UserService,
    BaseService,
    ExamService,
    StudentService,
    GlobalEventsManager,
    SchoolingService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}