import {User} from '../../app/models/user';
import {BaseService} from '../../app/services/base.service';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NotesPage} from '../notes/notes';
import {PayementsPage} from '../payements/payements';
import {MessagesPage} from '../messages/messages';
import {AbsensesPage} from '../absenses/absenses';
import {AbsensesAdminPage} from "../absenses/absenses-admin";
import {NotesAdminPage} from "../notes/notes-admin";
import {CoursPage} from "../payements/cours";
import {PayementsAdminPage} from "../payements/payements-admin";
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'page-tab-menu',
  templateUrl: 'tab-menu.html'
})
export class TabMenuPage {
  newMsgCount: number = 0;
  tab1Root: any = NotesPage;
  tab2Root: any = PayementsPage;
  tab3Root: any = MessagesPage;
  tab4Root: any = AbsensesPage;
  tab2Desc: string = 'Payements';
  user: User = JSON.parse(Cookie.get('loggedInUser'));
  constructor(public navCtrl: NavController, private baseService: BaseService) {
    this.initializeItems();
    if (this.user != null) {
      if (this.user.role == 1 || this.user.role == 5) {//admin
        this.tab1Root = NotesAdminPage;
        this.tab2Root = PayementsAdminPage;
        this.tab4Root = AbsensesAdminPage;
      } else if (this.user.role == 2) {//teacher
        this.tab1Root = NotesAdminPage;
        this.tab2Root = CoursPage;
        this.tab2Desc = 'Cours';
        this.tab4Root = AbsensesAdminPage;

      }
    }
  }

  initializeItems() {
    this.baseService.countSDMessages(this.user.id, 3650)
      .subscribe((data: number) => this.newMsgCount = data,
      error => console.log(error),
      () => console.log('Get All User SD Messages count Complete'));
  }
}
