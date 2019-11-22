import { Constants } from '../../app/app.constants';
import { User } from '../../app/models/user';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UserService } from '../../app/services/user.service';

@Component({
  selector: 'page-cico',
  templateUrl: 'cico.html'
})
export class CicoPage {
  url: string = Constants.webServer;
  msg: string;
  matricule: string;
  user: User;
  aUser: User = new User();
  constructor(public navCtrl: NavController,
    private userService: UserService) {
    this.user = JSON.parse(Cookie.get('loggedInUser'));
    this.userService.getById(this.user)
      .subscribe((data: User) => {
        this.user = data
        this.user.birthDate = new Date(this.user.birthDate);
      },
        error => console.log(error),
        () => console.log('Get user complete'));
  }

  public cico() {
    this.msg = "";
    this.aUser = new User();
    if(this.matricule)
    try {
      this.userService.cico(this.matricule)
        .subscribe(result => {
          this.aUser = result;
          console.log(this.aUser);
          this.setMsg(this.aUser)
          setTimeout(() => {
            console.log('after 3 sec');
            this.aUser = new User();
            this.matricule = null;
          }, 3000);
        })
    }
    catch (e) {
      this.msg = Constants.ERROR_OCCURRED;
    }
  }
  setMsg(aUser:User) {

    if (aUser.cicoStatus === 0) {//not found
      this.msg = 'Aucun utilisateur trouve'; 
    } else if (aUser.cicoStatus === 1) {
      this.msg = "L'heure de "+aUser.name+" enregistree avec succes ";
    } else if (aUser.cicoStatus === 2) {
      this.msg =   aUser.name+' est  desactive';
    } else if (aUser.cicoStatus === 3) {
      this.msg = aUser.name+' doit aller voir la tresorerie';
    }
  }
}
