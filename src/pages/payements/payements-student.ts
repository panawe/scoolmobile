import { SchoolYear } from "../../app/models/schoolYear";
import {TuitionView} from '../../app/models/tuitionView';
import {User} from "../../app/models/user";
import {BaseService} from '../../app/services/base.service';
import {PayementsStudentDtlPage} from "./payements-student-dtl";
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Cookie} from "ng2-cookies";

@Component({
  selector: 'page-payements-student',
  templateUrl: 'payements-student.html'
})
export class PayementsStudentPage {
  tuitions: TuitionView[];
  tuition: TuitionView;
  year: SchoolYear;
  color: string = 'primary';
  icon: string = 'checkmark-circle';
  user: User = JSON.parse(Cookie.get('user'));
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private baseService: BaseService) {
    this.tuition = navParams.get('tuition');
    this.year=navParams.get('year');
    this.baseService.getClassTuitions(this.tuition).subscribe((data: TuitionView[]) => {this.tuitions = data;},
      error => console.log(error),
      () => console.log('Get tuitions'));
  }

  goToPayment(data: TuitionView) {
    this.navCtrl.push(PayementsStudentDtlPage, {
      tuitionDtl: data,
      year: this.year
    });
  }
}
