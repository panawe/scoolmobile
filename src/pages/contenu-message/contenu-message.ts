import {Constants} from '../../app/app.constants';
import {SDMessage} from '../../app/models/sdMessage';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-contenu-message',
  templateUrl: 'contenu-message.html'
})
export class ContenuMessagePage {
  message: SDMessage = new SDMessage();
  url: string = Constants.apiServer;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.message = navParams.get('message');
  }

}
