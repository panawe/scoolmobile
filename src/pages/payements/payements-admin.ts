import {Constants} from "../../app/app.constants";
import {Enrollment} from '../../app/models/enrollment';
import {SchoolYear} from '../../app/models/schoolYear';
import {Student} from '../../app/models/student';
import {TuitionView} from '../../app/models/tuitionView';
import {BaseService} from '../../app/services/base.service';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-payements-admin',
  templateUrl: 'payements-admin.html'
})
export class PayementsAdminPage {
  year: SchoolYear = new SchoolYear();
  years: SchoolYear[];
  data: any;
  public student: Student;
  public error: string;
  public enrollment: Enrollment;
  public tuitions: TuitionView[];
  today: Date = new Date();
  constructor(public navCtrl: NavController,
    private baseService: BaseService) {
    this.baseService.getAllSchoolYears()
      .subscribe((data: SchoolYear[]) => this.years = data,
      error => console.log(error),
      () => console.log('Get All SchoolYears Complete'));

    this.baseService.getCurrentSchoolYear()
      .subscribe((data: SchoolYear) => {
        this.year = data;
        if (this.year != null) {
          this.getPaymentGraph();
          this.getTuitions();
        }
      }, error => console.log(error),
      () => console.log('Get getTuitions Complete'));
  }

  public getTuitions() {
    this.baseService.getTuitions(this.year).subscribe((data: TuitionView[]) => {this.tuitions = data;},
      error => console.log(error),
      () => console.log('Get tuitions'));
  }

  getPaymentGraph() {
    this.error = "";
    this.data = null;
    try {
      if (this.year) {
        this.baseService.getPaymentGraphTotal(this.year.id).subscribe((result: any) => {
          this.data = result;
        },
          error => console.log(error),
          () => console.log('getMarkProgress   Chart Complete'));
      } else {
        this.error = Constants.SELECT_YEAR;
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  getClassTuitions(event) {
    this.tuitions = [];
    /*
  this.searchCriteria = Constants.ETAT + " = " + event.element._model.label;
  console.log('Getting online registration by Status: ' + event.element._model.label);
  this.studentService.getOnlineRegistrationsByType('status|' + event.element._model.label)
    .subscribe(result => {
      this.onlineRegistrations = result;
      //console.log(this.onlineRegistrations);
    });
    */
  }
}
