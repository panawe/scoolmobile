import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ConnexionPage} from '../pages/connexion/connexion';
import {ProfilePage} from '../pages/profile/profile';
import {ConfigurationPage} from '../pages/configuration/configuration';
import {StudentsPage} from '../pages/students/students';
import {TabMenuPage} from '../pages/tab-menu/tab-menu';
import {Constants} from './app.constants';
import {User} from './models/user';
import {GlobalEventsManager} from './services/globalEventsManager';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = ConnexionPage;
  user: User = new User();
  url: string = Constants.apiServer;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private globalEventsManager: GlobalEventsManager) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.user = JSON.parse(Cookie.get('loggedInUser'));
      splashScreen.hide();
      if (this.user == null) {
        this.user = new User();
      }
    });
  }

  ngOnInit() {
    console.log('in AppComponent init');
    this.globalEventsManager.showNavBar.subscribe((data: boolean) => {
      console.log('reached');
      this.user = JSON.parse(Cookie.get('loggedInUser'));
    }, error => console.log(error));
  }
  goToConnexion(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ConnexionPage);
  } goToProfile(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ProfilePage);
  } goToConfiguration(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ConfigurationPage);
  } goToMain(params) {
    if (!params) params = {};
    if (this.user != null) {
      if (this.user.role == 4) {
        this.navCtrl.setRoot(StudentsPage);
      } else {
        this.navCtrl.setRoot(TabMenuPage);        
      }
    } else {
      this.navCtrl.setRoot(ConnexionPage);
    }
  } goToStudent(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(StudentsPage);
  }

  public logout() {
    Cookie.deleteAll();
    this.user = new User();
    this.navCtrl.setRoot(ConnexionPage);
  }

}
