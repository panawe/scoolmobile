import { Constants } from '../../app/app.constants';
import { User } from '../../app/models/user';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UserService } from '../../app/services/user.service';
import { Cico } from '../../app/models/cico';

@Component({
  selector: 'page-visitor',
  templateUrl: 'visitor.html'
})
export class VisitorPage {
  url: string = Constants.webServer;
  msg: string;
  cico: Cico = new Cico();
  user: User;
  error: string;
  failed = new Audio();
  success = new Audio();
  aUser: User = new User();
  constructor(public navCtrl: NavController,
    //private nativeAudio: NativeAudio,
    public platform: Platform,
    private userService: UserService) {
    this.user = JSON.parse(Cookie.get('loggedInUser'));
    this.userService.getById(this.user)
      .subscribe((data: User) => {
        this.user = data
        this.user.birthDate = new Date(this.user.birthDate);
      },
        error => console.log(error),
        () => console.log('Get user complete'));

    this.failed.src = "assets/audio/failure.mp3";
    this.success.src = "assets/audio/success.mp3";

  }

  checkRequiredFields(): boolean {
    let result = true;
    if (!this.cico.name) {
      this.error = 'Saisissez le nom';
      result = false;
    } else if (!this.cico.matricule) {
      this.error = 'Saisissez le numero de badge';
      result = false;
    } else if (!this.cico.reason) {
      this.error = 'Saisissez la raison de la visite';
      result = false;
    } else if (!this.cico.visitee) {
      this.error = 'Saisissez la personne visitee';
      result = false;
    }
    return result;
  }
  onSuccess() {

  }
  onError() {

  }
  public doCico() {
    this.msg = "";
    this.error = '';
    this.aUser = new User();
    this.cico.ci = new Date();

    if (this.checkRequiredFields()) {
      try {
        this.userService.cico(this.cico)
          .subscribe(result => {
            this.aUser = result;
            console.log(this.aUser);
            this.setMsg(this.aUser)
            if (this.aUser.cicoStatus === 1 || this.aUser.cicoStatus === 3 || this.aUser.cicoStatus === 4) {
              setTimeout(() => {
                console.log('after 3 sec');
                this.aUser = new User();
                this.cico = new Cico();
                this.cico.name = null;
                this.cico.phone = null;
                this.cico.reason = null;
                this.cico.visitee = null;
                this.cico.matricule = null;
              }, 3000);

            }
          })
      }
      catch (e) {
        this.msg = Constants.ERROR_OCCURRED;
      }
    } else {
      this.failed.play();
    }
  }
  setMsg(aUser: User) {

    if (aUser.cicoStatus === 0) {//not found
      this.msg = 'Numero de badge invalide';
      this.failed.play();
    } else if (aUser.cicoStatus === 1) {
      this.msg = "L'heure de " + aUser.name + " enregistree avec succes ";
      this.success.play();
    } else if (aUser.cicoStatus === 2) {
      this.msg = 'Numero de badge desactive';
      this.failed.play();
    } else if (aUser.cicoStatus === 3) {
      this.msg = aUser.name + ' doit aller voir la tresorerie';
      this.failed.play();
    } else if (aUser.cicoStatus === 4) {
      this.msg = aUser.name + " s'est deja enregistre";
      this.failed.play();
    }
  }
}
