import { Constants } from '../../app/app.constants';
import { User } from '../../app/models/user';
import { GlobalEventsManager } from '../../app/services/globalEventsManager';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { StudentsPage } from '../students/students';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TabMenuPage } from '../tab-menu/tab-menu';
import { Storage } from '@ionic/storage';
import { ConfigurationPage } from '../configuration/configuration';
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html'
})
export class ConnexionPage {
  error: string;
  user: User = JSON.parse(Cookie.get('loggedInUser'));
  constructor(public navCtrl: NavController, private storage: Storage,
    private globalEventsManager: GlobalEventsManager,
    private userService: UserService) {
    if (this.user == null) {
      this.user = new User();
    }
    this.storage.ready().then(() => {
      this.storage.get('url').then((val) => {
        Constants.apiServer = val;
        console.log('Got the URL :' + val);

        if (!val) {
          this.navCtrl.setRoot(ConfigurationPage);
        }

        if (this.user.id > 0) {
          if (this.user.role == 4) {
            this.navCtrl.setRoot(StudentsPage);
          } else {
            this.navCtrl.setRoot(TabMenuPage);
          }
        }

      });
    });


  }
  public login() {
    try {
      console.log('Connecting to :'+Constants.apiServer);
      this.userService.login(this.user)
        .subscribe(result => {
          if (result == true) {
            this.user = JSON.parse(Cookie.get('loggedInUser'));
            this.globalEventsManager.showNavBar.emit(this.user);
            if (this.user.role == 4) {
              this.navCtrl.setRoot(StudentsPage);
            } else {
              this.navCtrl.setRoot(TabMenuPage);
            }
          }
          else {
            this.error = Constants.INVALID_USER_PASS;
          }
        })
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }
}
