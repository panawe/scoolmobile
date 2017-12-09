import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContenuMessagePage } from '../contenu-message/contenu-message';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  constructor(public navCtrl: NavController) {
  }
  goToContenuMessage(params){
    if (!params) params = {};
    this.navCtrl.push(ContenuMessagePage);
  }
}
