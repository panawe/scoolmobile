import {Constants} from '../../app/app.constants';
import {User} from '../../app/models/user';
import {UserService} from '../../app/services/user.service';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {TabMenuPage} from '../tab-menu/tab-menu'; 
@Component({
  selector: 'page-students',
  templateUrl: 'students.html'
})
export class StudentsPage {
  public error: string;
  public children: User[] = [];
  url: string = Constants.apiServer;
  constructor(public navCtrl: NavController,
    private userService: UserService) {
    const user: User = JSON.parse(Cookie.get('loggedInUser'));
    if (user.role == 4) {//parent
      this.userService.getUsersLightByParent(user.id)
        .subscribe((data: User[]) => {
          this.children = data;
          if (this.children && this.children.length > 1) {//more than 1
            Cookie.set('user', JSON.stringify(this.children[0]));
          } else if (this.children.length == 1) {//just one child
            Cookie.set('user', JSON.stringify(this.children[0]));
            this.navCtrl.setRoot(TabMenuPage);
          } else {//no child

          }
        },
        error => console.log(error),
        () => console.log('Get all Students by parent complete'));
    }
  }

  goToContenuNotes(student: User) {
    Cookie.set('user', JSON.stringify(student));
    this.navCtrl.setRoot(TabMenuPage);
  }
}
