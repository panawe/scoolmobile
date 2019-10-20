import {Constants} from '../../app/app.constants';
import {SDMessage} from '../../app/models/sdMessage';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-new-message',
  templateUrl: 'new-message.html'
})
export class NewMessagePage {
  message: SDMessage = new SDMessage();
  url: string = Constants.webServer;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.message = navParams.get('message');
  }

}
