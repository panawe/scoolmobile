import { Constants } from '../../app/app.constants';
import { User } from '../../app/models/user';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UserService } from '../../app/services/user.service';
import { NativeAudio } from '@ionic-native/native-audio';
import { Cico } from '../../app/models/cico';

@Component({
  selector: 'page-cico',
  templateUrl: 'cico.html'
})
export class CicoPage {
  url: string = Constants.webServer;
  msg: string;
  cico: Cico = new Cico();
  user: User;
  aUser: User = new User();
  constructor(public navCtrl: NavController,
    private nativeAudio: NativeAudio,
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

    this.platform.ready().then(() => {
      console.log("platform ready");

      this.nativeAudio.preloadComplex('failed', 'assets/audio/failed.mp3', 1, 1, 0).then(function () {
        console.log("audio loaded!");
      }, function (err) {
        console.log("audio failed: " + err);
      });

      this.nativeAudio.preloadComplex('success', 'assets/audio/success.mp3', 1, 1, 0).then(function () {
        console.log("audio loaded!");
      }, function (err) {
        console.log("audio failed: " + err);
      });

    });

  }

  onSuccess() {

  }
  onError() {

  }
  public doCico() {
    this.msg = "";
    this.aUser = new User();
    this.cico.ci = new Date();
    if (this.cico.matricule)
      try {
        this.userService.cico(this.cico)
          .subscribe(result => {
            this.aUser = result;
            console.log(this.aUser);
            this.setMsg(this.aUser)
            setTimeout(() => {
              console.log('after 3 sec');
              this.aUser = new User();
              this.cico = new Cico();
              this.cico.matricule=null;
            }, 3000);
          })
      }
      catch (e) {
        this.msg = Constants.ERROR_OCCURRED;
      }
  }
  setMsg(aUser: User) {

    if (aUser.cicoStatus === 0) {//not found
      this.msg = 'Aucun utilisateur trouve';
      this.nativeAudio.play('failed').then(function () {
        console.log("playing audio!");
      }, function (err) {
        console.log("error playing audio: " + err);
      });
    } else if (aUser.cicoStatus === 1) {
      this.msg = "L'heure de " + aUser.name + " enregistree avec succes ";
      this.nativeAudio.play('success').then(function () {
        console.log("playing audio!");
      }, function (err) {
        console.log("error playing audio: " + err);
      });
    } else if (aUser.cicoStatus === 2) {
      this.msg = aUser.name + ' est  desactive';
      this.nativeAudio.play('failed').then(function () {
        console.log("playing audio!");
      }, function (err) {
        console.log("error playing audio: " + err);
      });
    } else if (aUser.cicoStatus === 3) {
      this.msg = aUser.name + ' doit aller voir la tresorerie';
      this.nativeAudio.play('failed').then(function () {
        console.log("playing audio!");
      }, function (err) {
        console.log("error playing audio: " + err);
      });
    } else if (aUser.cicoStatus === 4) {
      this.msg = aUser.name + " s'est deja enregistre";
    }
  }

  format(date): string {
    return date.getFullYear()
      + '-' + this.leftpad(date.getMonth() + 1, 2)
      + '-' + this.leftpad(date.getDate(), 2)
      + ' ' + this.leftpad(date.getHours(), 2)
      + ':' + this.leftpad(date.getMinutes(), 2)
      + ':' + this.leftpad(date.getSeconds(), 2);
  }

  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }

}
