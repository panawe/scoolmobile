import { Constants } from '../../app/app.constants';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseService } from '../../app/services/base.service';
import { Client } from '../../app/models/client';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ConnexionPage } from '../connexion/connexion';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {
  url: string;
  error: string;
  msg: string;
  label: string = "Tester";
  clients: Client[];
  client: Client = new Client();
  constructor(public navCtrl: NavController, private storage: Storage,
    private baseService: BaseService) {
    console.log('Getting client list');
    this.baseService.getActiveClients()
      .subscribe((data: Client[]) => {
        this.clients = data;
        console.log(this.clients);
        this.storage.ready().then(() => {
          this.storage.get('cid').then((val: number) => {
            console.log('cid val =' + val);
            for (var i = 0; i < this.clients.length; i++) {
              const c: Client = this.clients[i];
              console.log("checking client Id: " + c.id);
              if (c.id == val) {
                this.client = c;
                console.log("client matched cid=" + val);
                break;
              }
            }
          });
        });

      }, error => console.log(error),
        () => console.log('Get All Active Clients Complete'));
  }

  save() {
    this.error = "";
    this.msg = "";
    try {
      this.storage.ready().then(() => {
        console.log("Save client=" + this.client.id);
        this.storage.set('cid', this.client.id);
        Constants.apiServer = this.client.restUrl;
        Constants.webServer=this.client.webUrl;
        this.storage.set('url', this.client.restUrl);
        this.storage.set('weburl', this.client.webUrl);
        console.log("Save client REST URL = " + this.client.restUrl);
        console.log("Save client Web URL = " + this.client.webUrl);
        this.msg = Constants.saveSuccess;

        setTimeout(() => {
          console.log('after 3 sec');
          Cookie.deleteAll();
          this.navCtrl.setRoot(ConnexionPage);
        }, 3000);

      });
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }

  test() {
    this.error = "";
    this.msg = "";
    this.label = "Test en cours. Patientez...";
    try {
      this.baseService.ping(this.url)
        .subscribe((data: string) => {
          if (data.endsWith("Success")) {
            this.msg = "Success";
          } else {
            this.error = Constants.ERROR_OCCURRED;
          };
          this.label = "Tester";
        },
          error => {
            this.error = Constants.ERROR_OCCURRED;
            console.log(error);
            this.label = "Tester";

          },
          () => console.log('Get All SchoolYears Complete'));
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
      this.label = "Tester";
    }
  }

}
