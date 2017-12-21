import {Constants} from '../../app/app.constants';
import {User} from '../../app/models/user';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {UserService} from '../../app/services/user.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  url: string = Constants.apiServer;
  error: string;
  msg: string;
  user: User;
  constructor(public navCtrl: NavController,
    private userService: UserService) {
    this.user = JSON.parse(Cookie.get('loggedInUser'));
    this.userService.getById(this.user)
      .subscribe((data: User) => {
        this.user = data
        this.user.birthDate = new Date(this.user.birthDate);
      },
      error => console.log(error),
      () => console.log('Get user complete'));
  }

  public saveUser() {
    this.msg="";
    this.error="";
    try {
      this.userService.saveUser(this.user)
        .subscribe(result => {
          if (result == "Success") {
            this.msg = Constants.saveSuccess;
          }
          else {
            this.error = Constants.saveNotSuccess + ", " + result;
          }
        })
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }

  }
}
