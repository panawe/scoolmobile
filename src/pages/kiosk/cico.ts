import { Constants } from '../../app/app.constants';
import { User } from '../../app/models/user';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UserService } from '../../app/services/user.service';
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
  failed = new Audio();
  success = new Audio();
  cicoCleanupTime = 5;
  constructor(public navCtrl: NavController,
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

    this.userService.getCicoCleanupTime()
      .subscribe((data: number) => {
        console.log('Cico cleanup =' + data);
        this.cicoCleanupTime = data
      },
        error => console.log(error),
        () => console.log('Get cicoCleanupTime'));

    this.failed.src = "assets/audio/failure.mp3";
    this.success.src = "assets/audio/success.mp3";

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
              this.cico.matricule = null;
              document.getElementById('matricule').focus();
            }, this.cicoCleanupTime * 1000);
          })
      }
      catch (e) {
        this.msg = Constants.ERROR_OCCURRED;
      }
  }
  setMsg(aUser: User) {
    if (aUser.cicoStatus === 0) {//not found
      this.msg = 'Accès non autorisé. Badge invalide.';
      this.failed.play();
    } else if (aUser.cicoStatus === 1) {
      this.msg = this.getSex(aUser) + ' ' + aUser.name + ",  bienvenue à iPnet !";
      this.success.play();
    } else if (aUser.cicoStatus === 2) {
      this.msg = this.getSex(aUser) + ' ' + aUser.name + ",  faites-vous activer.";
      this.failed.play();
    } else if (aUser.cicoStatus === 3) {
      this.msg = this.getSex(aUser) + ' ' + aUser.name + ",  rendez vous à l'administration.";
      this.failed.play();
    } else if (aUser.cicoStatus === 4) {
      this.msg = this.getSex(aUser) + ' ' + aUser.name + ",  vous êtes déjà reçu.";
      this.failed.play();
    } else if (aUser.cicoStatus === 5) {
      this.msg = this.getSex(aUser) + ' ' + aUser.name + ",  aurevoir !";
      this.failed.play();
    }
  }


  getSex(user: User): string {
    if (user.sex === 'M') {
      return 'Monsieur';
    } else if (user.sex === 'I') {
      return '';
    } else {
      return 'Madame';
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
