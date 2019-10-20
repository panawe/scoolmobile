import {Constants} from '../../app/app.constants';
import {User} from '../../app/models/user';
import {UserService} from "../../app/services/user.service";
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AbsensesEditPage} from "./absenses-edit";
@Component({
  selector: 'page-absenses-admin',
  templateUrl: 'absenses-admin.html'
})
export class AbsensesAdminPage {
  url: string = Constants.webServer;
  public users: User[];
  public searchText: string;
  public error: string;
  constructor(public navCtrl: NavController,
    private userService: UserService, ) {

  }

  public search() {
    this.error = null;
    if (this.searchText != null) {
      this.userService.search("3|" + this.searchText).subscribe((data: User[]) => {
        this.users = data;
        if (this.users == null || this.users.length <= 0) {
          this.error = Constants.NO_USER_FOUND;
        }
      },
        error => console.log(error),
        () => console.log('Find users with name like ' + this.searchText));
    }
  }

  chooseUser(aUser) {
    this.navCtrl.push(AbsensesEditPage, {
      student: aUser
    });
  }

}
