import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ContenuMessagePage} from '../contenu-message/contenu-message';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  searchQuery: string = '';
  items: string[];
  msgType: number;
  constructor(public navCtrl: NavController) {
    this.initializeItems();
  }
  goToContenuMessage(params) {
    if (!params) params = {};
    this.navCtrl.push(ContenuMessagePage);
  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'Test'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
