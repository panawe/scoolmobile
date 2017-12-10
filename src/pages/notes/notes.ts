import {SchoolYear} from '../../app/models/schoolYear';
import {BaseService} from '../../app/services/base.service';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MatierePage} from '../matiere/matiere';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {
  year: SchoolYear;
  years: SchoolYear[];
  constructor(public navCtrl: NavController,
    private baseService: BaseService) {
    this.baseService.getAllSchoolYears()
      .subscribe((data: SchoolYear[]) => this.years = data,
      error => console.log(error),
      () => console.log('Get All SchoolYears Complete'));
  }
  goToMatiere(params) {
    if (!params) params = {};
    this.navCtrl.push(MatierePage);
  }

  getSubjects() {

  }
}
