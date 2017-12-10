import { Constants } from '../../app/app.constants';
import { User } from '../../app/models/user';
import { GlobalEventsManager } from '../../app/services/globalEventsManager';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import {Cookie} from 'ng2-cookies/ng2-cookies'; 
import { TabMenuPage } from '../tab-menu/tab-menu';
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html'
})
export class ConnexionPage {
  error:  string; 
  user: User = JSON.parse(Cookie.get('user'));
  constructor(public navCtrl: NavController,
    private globalEventsManager: GlobalEventsManager,
      private userService: UserService) {
    if(this.user==null){
      this.user = new User();
    }else{
      this.navCtrl.setRoot(TabMenuPage);
    }
  }
  public login() {
    try {
      this.userService.login(this.user)
        .subscribe(result => {
          if (result == true) {
             this.globalEventsManager.showNavBar.emit(this.user);
            this.navCtrl.setRoot(TabMenuPage)
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
