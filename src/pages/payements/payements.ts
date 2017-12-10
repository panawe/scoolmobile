import {SchoolYear} from '../../app/models/schoolYear';
import {Student} from '../../app/models/student';
import {User} from '../../app/models/user';
import {BaseService} from '../../app/services/base.service';
import {StudentService} from '../../app/services/student.service';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'page-payements',
  templateUrl: 'payements.html'
})
export class PayementsPage {
  year: SchoolYear;
  years: SchoolYear[];
  public student: Student;
  public error: string;
  constructor(public navCtrl: NavController,
    private studentService: StudentService,
    private baseService: BaseService) {
    const user: User = JSON.parse(Cookie.get('user'));
    this.setStudent(user);
    this.baseService.getAllSchoolYears()
      .subscribe((data: SchoolYear[]) => this.years = data,
      error => console.log(error),
      () => console.log('Get All SchoolYears Complete'));
  }

  public setStudent(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.studentService.getByUser(aUser)
        .subscribe(result => {
          this.student = result;
        });

    }
  }

  /*
  public getEnrollments(aUser: User) {
    if (this.student != null) {
      this.studentService.getEnrollments(this.student)
        .subscribe(result => {
          this.enrollments = result;
        });
    }
  }
  public getTuitionList(evt) {
    this.enrollment = evt.data;
    this.enrollment.enrollmentDate = new Date(this.enrollment.enrollmentDate);
    this.studentService.getTuitionList(this.enrollment).subscribe((data: TuitionView[]) => {this.tuitions = data;},
      error => console.log(error),
      () => console.log('Get tuitions'));
  }*/
}
