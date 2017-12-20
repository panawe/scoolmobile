import {User} from '../../app/models/user';
import {BaseService} from '../../app/services/base.service';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NotesPage} from '../notes/notes';
import {PayementsPage} from '../payements/payements';
import {MessagesPage} from '../messages/messages';
import {AbsensesPage} from '../absenses/absenses';
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
  constructor(public navCtrl: NavController, private baseService: BaseService) {
    this.initializeItems();
  }

  initializeItems() {
    const user: User = JSON.parse(Cookie.get('user'));
    this.baseService.countSDMessages(user.id, 30)
      .subscribe((data: number) => this.newMsgCount = data,
      error => console.log(error),
      () => console.log('Get All User SD Messages count Complete'));
  }
}
