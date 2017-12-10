import {Constants} from '../../app/app.constants';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {
  url: string;
  port: number;
  error: string;
  msg: string;
  constructor(public navCtrl: NavController, private storage: Storage) {
  }

  save() {
    this.error = "";
    this.msg = "";
    try {
      this.storage.set('url', this.url);
      this.storage.set('port', this.port);
      this.msg = Constants.saveSuccess;
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }

  test() {
    this.error = "";
    this.msg = "";
    try {
      let theUrl: string;
      this.storage.get('url').then((val) => {
        theUrl += val;
      });

      this.storage.get('port').then((val) => {
        theUrl += ':' + val;
      });
      
      this.msg ='URL='+ theUrl;
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }

}
