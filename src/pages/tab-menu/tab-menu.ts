import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotesPage } from '../notes/notes';
import { PayementsPage } from '../payements/payements';
import { MessagesPage } from '../messages/messages';
import { AbsensesPage } from '../absenses/absenses';

@Component({
  selector: 'page-tab-menu',
  templateUrl: 'tab-menu.html'
})
export class TabMenuPage {

  tab1Root: any = NotesPage;
  tab2Root: any = PayementsPage;
  tab3Root: any = MessagesPage;
  tab4Root: any = AbsensesPage;
  constructor(public navCtrl: NavController) {
  }
  
}
