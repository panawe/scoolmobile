import {Constants} from '../../app/app.constants';
import {SDMessage} from '../../app/models/sdMessage';
import {User} from '../../app/models/user';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ContenuMessagePage} from '../contenu-message/contenu-message';
import {Cookie} from 'ng2-cookies';
import {BaseService} from '../../app/services/base.service';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  searchQuery: string = '';
  alerts: SDMessage[];
  sentMsgs: SDMessage[];
  receivedMsgs: SDMessage[];
  msgCounts: number[];
  msgType: number=1;
  user: User = JSON.parse(Cookie.get('loggedInUser'));
  url: string = Constants.apiServer;
  constructor(public navCtrl: NavController, private baseService: BaseService) {
    this.initializeItems();
  }
  goToContenuMessage(message: SDMessage) {
    if (message.status == 0) {
      message.status = 1;
      this.msgCounts[this.msgType - 1]--;
      this.baseService.markSDMessageAsRead(message)
        .subscribe((data: string) => {console.log(data)},
        error => console.log(error),
        () => console.log('Mark Message as Read Complete'));
    }

    this.navCtrl.push(ContenuMessagePage, {
      message
    });
  }

  initializeItems() {
    //const user: User = JSON.parse(Cookie.get('user'));
    this.baseService.getUserSDMessages(this.user.id, 30, 1)
      .subscribe((data: SDMessage[]) => this.alerts = data,
      error => console.log(error),
      () => console.log('Get All Alerts Complete'));

    this.baseService.getUserSDMessages(this.user.id, 30, 2)
      .subscribe((data: SDMessage[]) => this.receivedMsgs = data,
      error => console.log(error),
      () => console.log('Get All User SD Messages Complete'));

    this.baseService.getSentSDMessages(this.user.id, 30)
      .subscribe((data: SDMessage[]) => this.sentMsgs = data,
      error => console.log(error),
      () => console.log('Get All Sent Messages Complete'));

    this.baseService.countSDMessagesByType(this.user.id, 30)
      .subscribe((data: number[]) => {
        this.msgCounts = data;
      },
      error => console.log(error),
      () => console.log('Get All User SD Messages Complete'));
  }

  deleteMessage(message: SDMessage) {
    message.status = 2;
    this.msgCounts[this.msgType - 1]--;
    this.baseService.markSDMessageAsRead(message)
      .subscribe((data: string) => {
        console.log(data);
        this.updateList(message);
      },
      error => console.log(error),
      () => console.log('Mark Message as Read Complete'));
  }

  updateList(message: SDMessage) {
    if (this.msgType == 1) {
      this.alerts.splice(this.alerts.indexOf(message), 1);
      var onTheFly: SDMessage[] = [];
      onTheFly.push(...this.alerts);
      this.alerts = onTheFly;
    } else if (this.msgType == 2) {
      this.receivedMsgs.splice(this.receivedMsgs.indexOf(message), 1);
      var onTheFly1: SDMessage[] = [];
      onTheFly.push(...this.receivedMsgs);
      this.receivedMsgs = onTheFly1;
    } else if (this.msgType == 3) {
      this.sentMsgs.splice(this.sentMsgs.indexOf(message), 1);
      var onTheFly2: SDMessage[] = [];
      onTheFly.push(...this.sentMsgs);
      this.sentMsgs = onTheFly2;
    }
  }

  findSelectedIndex(): number {
    return
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      if (this.msgType == 1) {
        this.alerts = this.alerts.filter((item) => {
          return (item.body.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      } else if (this.msgType == 2) {
        this.receivedMsgs = this.receivedMsgs.filter((item) => {
          return (item.body.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      } else if (this.msgType == 3) {
        this.sentMsgs = this.sentMsgs.filter((item) => {
          return (item.body.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    } else {

      if (this.msgType == 1) {
        this.baseService.getUserSDMessages(this.user.id, 30, 1)
          .subscribe((data: SDMessage[]) => this.alerts = data,
          error => console.log(error),
          () => console.log('Get All Alerts Complete'));
      } else if (this.msgType == 2) {
        this.baseService.getUserSDMessages(this.user.id, 30, 2)
          .subscribe((data: SDMessage[]) => this.receivedMsgs = data,
          error => console.log(error),
          () => console.log('Get All User SD Messages Complete'));
      } else if (this.msgType == 3) {
        this.baseService.getSentSDMessages(this.user.id, 30)
          .subscribe((data: SDMessage[]) => this.sentMsgs = data,
          error => console.log(error),
          () => console.log('Get All Sent Messages Complete'));
      }

    }
  }
}
