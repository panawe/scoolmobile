import { Schooling } from '../../app/models/schooling';
import { User } from '../../app/models/user';
import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-absenses-detail',
  templateUrl: 'absensesDetails.html'
})
export class AbsensesDetailsPage {
  schooling : Schooling = new Schooling();
  currentUser: User = JSON.parse(Cookie.get('user'));

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
        
      if (this.currentUser == null) {
        this.currentUser = new User();
      }

      this.schooling = navParams.get('schooling');
    
    
  }
 
  
}
