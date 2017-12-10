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
  error: string;
  msg: string;
  constructor(public navCtrl: NavController, private storage: Storage) {
          this.storage.ready().then(() => {
        this.storage.get('url').then((val) => {
          this.url=val;
        });
        
      });
  }

  save() {
    this.error = "";
    this.msg = "";
    try {

      this.storage.ready().then(() => {
        this.storage.set('url', this.url);
        this.msg = Constants.saveSuccess;
      });
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }

  test() {
    this.error = "";
    this.msg = "";
    try {
      this.storage.ready().then(() => {
        this.storage.get('url').then((val) => {
          console.log('Your URL is', val);
          this.msg= val;
        });
        
      });
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }

}
