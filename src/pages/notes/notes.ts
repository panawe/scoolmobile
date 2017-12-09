import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MatierePage } from '../matiere/matiere';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {

  constructor(public navCtrl: NavController) {
  }
  goToMatiere(params){
    if (!params) params = {};
    this.navCtrl.push(MatierePage);
  }
}
