import {Constants} from '../../app/app.constants';
import {SchoolYear} from '../../app/models/schoolYear';
import {Schooling} from '../../app/models/schooling';
import {SchoolingView} from '../../app/models/schoolingView';
import {User} from '../../app/models/user';
import {BaseService} from '../../app/services/base.service';
import {SchoolingService} from '../../app/services/schooling.service';
import {AbsensesDetailsPage} from './absensesDetails';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'page-absenses',
  templateUrl: 'absenses.html'
})
export class AbsensesPage {
  year: SchoolYear;
  years: SchoolYear[];
  schoolings: SchoolingView[] = [];
  currentUser: User = JSON.parse(Cookie.get('user'));
  cols: any[]

  constructor(public navCtrl: NavController,
    private baseService: BaseService,
    private schoolingService: SchoolingService) {
    this.baseService.getAllSchoolYears()
      .subscribe((data: SchoolYear[]) => this.years = data,
      error => console.log(error),
      () => console.log('Get All SchoolYears Complete'));

    this.baseService.getCurrentSchoolYear()
      .subscribe((data: SchoolYear) => {
        this.year = data;
        if (this.year != null) {
          this.getUserSchoolings();
        }
      },
      error => console.log(error),
      () => console.log('Get All SchoolYears Complete'));

    if (this.currentUser == null) {
      this.currentUser = new User();
    }

    if (this.year) {
      this.getUserSchoolings();
      this.cols = [
        {field: 'eventDate', header: Constants.DATE, type: 'Date', sortable: 'true'},
        {field: 'eventType', header: Constants.VIOLATION, sortable: 'true'},
        {field: 'description', header: Constants.COMMENT, sortable: 'false', filter: 'true'},
        {field: 'year', header: Constants.SCHOOLYEAR, sortable: 'false', filter: 'true'}
      ];
    }
  }

  public getUserSchoolings() {
    this.schoolings = [];
    this.schoolingService.getByStudentAndYear(this.currentUser.id, this.year.id)
      .subscribe((data: SchoolingView[]) => {
        this.schoolings = data
        console.info("Schoolings: " + this.schoolings);
      },
      error => console.log(error),
      () => console.log('Get all Schoolings complete'));
  }

  public goToSchooling(schoolingId: number) {
    let schooling: Schooling;
    this.schoolingService.getById(schoolingId)
      .subscribe((data: Schooling) => {

        schooling = data
        if (schooling && schooling !== undefined && schooling.eventDate !== null) {
          schooling.eventDate = new Date(schooling.eventDate);
        }
        this.navCtrl.push(AbsensesDetailsPage, {
          schooling: schooling
        });
      },
      error => console.log(error),
      () => console.log('Get schooling complete'));

  }

}
