import { Constants } from '../../app/app.constants';
import { SDMessage } from '../../app/models/sdMessage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/models/user';
import { UserService } from '../../app/services/user.service';
import { BaseService } from '../../app/services/base.service';

@Component({
  selector: 'page-new-message',
  templateUrl: 'new-message.html'
})
export class NewMessagePage {
  message: SDMessage = new SDMessage();
  url: string = Constants.webServer;
  searchText: string;
  public users: User[];
  public error: string;
  msg = '';
  showRecipients = false;
  USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService: UserService, private baseService: BaseService) {
    this.message = navParams.get('message');
    this.message.recipients = [];
  }
  sendMessage() {
    this.msg = null;
    this.error = null;
    if (!this.message.subject || !this.message.body
      || !this.message.recipients || this.message.recipients.length < 1) {
      this.error = 'Remplissez tous les champs obligatoires';
    } else {
      this.baseService.sendSDMessage(this.message)
        .subscribe((data: string) => {
          if (data.startsWith('Success')) {
            this.msg = 'Message envoye avec succes';
            this.message= new SDMessage();
            this.message.body='';
            this.message.subject='';
            this.users=[];
            this.message.recipients=[];
            this.searchText='';
            this.showRecipients=false;
          } else {
            this.error = data;
          }
        },
          error => console.log(error),
          () => console.log('sendMessage Complete'));
    }
  }
  closeRecipient() {
    this.showRecipients = false;
  }

  showRecipient() {
    this.showRecipients = true;
  }

  removeRecipient(aUser: User) {
    this.message.recipients.splice(this.message.recipients.indexOf(aUser), 1);
    //console.log(this.message.recipients);
    var onTheFly: User[] = [];
    onTheFly.push(...this.message.recipients);
    this.message.recipients = onTheFly;
    console.log(this.message.recipients);
  }
  selectUser(aUser: User) {
    this.message.recipients.push(aUser);
    this.users.splice(this.users.indexOf(aUser), 1);
    var onTheFly: User[] = [];
    onTheFly.push(...this.users);
    this.users = onTheFly;
    console.log(this.message.recipients);
  }
  public search() {
    this.error = null;
    if (this.searchText != null) {
      this.userService.search(this.searchText).subscribe((data: User[]) => {
        this.users = data;
        if (this.users == null || this.users.length <= 0) {
          this.error = Constants.NO_USER_FOUND;
        }
      },
        error => console.log(error),
        () => console.log('Find users with name like ' + this.searchText));
    }
  }

}
