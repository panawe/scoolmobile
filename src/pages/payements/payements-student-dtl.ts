import {Enrollment} from "../../app/models/enrollment";
import {SchoolYear} from "../../app/models/schoolYear";
import {Student} from "../../app/models/student";
import {TuitionView} from '../../app/models/tuitionView';
import {User} from "../../app/models/user";
import {BaseService} from '../../app/services/base.service';
import {StudentService} from "../../app/services/student.service";
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Cookie} from "ng2-cookies";

@Component({
  selector: 'page-payements-student-dtl',
  templateUrl: 'payements-student-dtl.html'
})
export class PayementsStudentDtlPage {
  tuitions: TuitionView[];
  tuition: TuitionView;
  year: SchoolYear;
  color: string = 'primary';
  icon: string = 'checkmark-circle';
  user: User = JSON.parse(Cookie.get('user'));
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private baseService: BaseService, private studentService: StudentService) {
    let enr: Enrollment = new Enrollment();
    let st: Student = new Student();
    this.tuition = navParams.get('tuitionDtl');
    this.year = navParams.get('year');
    st.id = this.tuition.studentId;
    enr.student = st;
    enr.schoolYear = this.year;
    this.baseService.getStudentTuitions(enr).subscribe((data: TuitionView[]) => {this.tuitions = data;},
      error => console.log(error),
      () => console.log('Get tuitions'));
  }

  public saveTuition(tuitionView: TuitionView) {
    this.color = 'danger';
    this.icon = 'close-circle';
    const index = this.tuitions.indexOf(tuitionView);
    tuitionView.modBy = this.user.id;
    if ((tuitionView.newPay && tuitionView.newPay > 0) || (tuitionView.newRebate && tuitionView.newRebate > 0))
      this.studentService.saveTuition(tuitionView).subscribe((data: TuitionView) => {
        this.tuition.balance = this.tuition.balance - tuitionView.newPay - tuitionView.newRebate;
        this.tuition.paid += +tuitionView.newPay;
        this.tuition.rebate += +tuitionView.newRebate;
        tuitionView = data;
        this.tuitions[index] = tuitionView;
        var onTheFly: TuitionView[] = [];
        onTheFly.push(...this.tuitions);
        this.tuitions = onTheFly;
        this.color = 'secondary';
        this.icon = 'checkmark-circle';
        console.log(data);
      },
        error => console.log(error),
        () => console.log('Save Tuition'));
  }
}
