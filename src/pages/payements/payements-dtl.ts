import {Enrollment} from '../../app/models/enrollment';
import {SchoolYear} from '../../app/models/schoolYear';
import {Student} from '../../app/models/student';
import {TuitionView} from '../../app/models/tuitionView';
import {User} from '../../app/models/user';
import {StudentService} from '../../app/services/student.service';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { YearData } from '../../app/models/yearData';

@Component({
  selector: 'page-payements-dtl',
  templateUrl: 'payements-dtl.html'
})
export class PayementsDtlPage {
  year: SchoolYear = new SchoolYear(); 
  public student: Student;
  public error: string;
  public enrollment: Enrollment;
  public tuitions: TuitionView[];
  today: Date = new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private studentService: StudentService ) {
    const user: User = JSON.parse(Cookie.get('user'));
    const yd: YearData = navParams.get('yearData1');
    this.year = yd.year;
    
    this.setStudent(user);

  }

  public setStudent(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.studentService.getByUser(aUser)
        .subscribe(result => {
          this.student = result;
          this.getTuitions();
        });

    }
  }

  public getTuitions() {
    this.tuitions = [];
    if (this.student && this.year)
      this.studentService.getEnrollment(this.student, this.year)
        .subscribe(result => {
          this.enrollment = result;
          this.studentService.getTuitions(this.enrollment).subscribe((data: TuitionView[]) => {this.tuitions = data;},
            error => console.log(error),
            () => console.log('Get tuitions'));
        });
  }


}
