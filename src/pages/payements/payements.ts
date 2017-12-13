import {Enrollment} from '../../app/models/enrollment';
import {SchoolYear} from '../../app/models/schoolYear';
import {Student} from '../../app/models/student';
import {TuitionView} from '../../app/models/tuitionView';
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
  year: SchoolYear = new SchoolYear();
  years: SchoolYear[];
  public student: Student;
  public error: string;
  public enrollment: Enrollment;
  public tuitions: TuitionView[];
  today: Date = new Date();
  constructor(public navCtrl: NavController,
    private studentService: StudentService,
    private baseService: BaseService) {
    const user: User = JSON.parse(Cookie.get('user'));
    this.setStudent(user);
    this.baseService.getAllSchoolYears()
      .subscribe((data: SchoolYear[]) => this.years = data,
      error => console.log(error),
      () => console.log('Get All SchoolYears Complete'));

    this.baseService.getCurrentSchoolYear()
      .subscribe((data: SchoolYear) => {
        this.year = data;
        if (this.year != null) {
          if (this.student != null) {
            this.getTuitions();
          } else {
            this.studentService.getByUser(user)
              .subscribe(result => {
                this.student = result;
                this.getTuitions();
              });
          }

        }
      }, error => console.log(error),
      () => console.log('Get getTuitions Complete'));
  }

  public setStudent(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.studentService.getByUser(aUser)
        .subscribe(result => {
          this.student = result;
        });

    }
  }

  public getTuitions() {
    this.tuitions = [];
    if(this.student&&this.year)
    this.studentService.getEnrollment(this.student, this.year)
      .subscribe(result => {
        this.enrollment = result;
        this.studentService.getTuitions(this.enrollment).subscribe((data: TuitionView[]) => {this.tuitions = data;},
          error => console.log(error),
          () => console.log('Get tuitions'));
      });
  }


}
