import {TuitionView} from '../../app/models/tuitionView';
import {BaseService} from '../../app/services/base.service';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-payements-student',
  templateUrl: 'payements-student.html'
})
export class PayementsStudentPage {
  tuitions: TuitionView[];
  tuition: TuitionView;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private baseService: BaseService) {
    this.tuition = navParams.get('tuition');
    this.baseService.getClassTuitions(this.tuition).subscribe((data: TuitionView[]) => {this.tuitions = data;},
      error => console.log(error),
      () => console.log('Get tuitions'));
  }
}
