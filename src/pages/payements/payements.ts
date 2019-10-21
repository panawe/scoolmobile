import { BaseService } from '../../app/services/base.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PayementsDtlPage } from './payements-dtl';
import { YearData } from '../../app/models/yearData';
import { StudentService } from '../../app/services/student.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Student } from '../../app/models/student';
import { User } from '../../app/models/user';

@Component({
  selector: 'page-payements',
  templateUrl: 'payements.html'
})
export class PayementsPage {
  yearDatas: YearData[] = [];
  public student: Student;
  constructor(public navCtrl: NavController,
    private studentService: StudentService,
    private baseService: BaseService) {
    const user: User = JSON.parse(Cookie.get('user'));
    this.setStudent(user);

  }

  getYearTuitions(data) {
    this.navCtrl.push(PayementsDtlPage, {
      yearData1: data
    });
  }

  public setStudent(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.studentService.getByUser(aUser)
        .subscribe(result => {
          this.student = result;
          console.log('Getting year data');
          this.baseService.getYearTuition(this.student.id)
            .subscribe((data: YearData[]) => {
              this.yearDatas = data;
              console.log(this.yearDatas);
            }, error => console.log(error),
              () => console.log('Get getYearTuition Complete'));
        });

    }
  }
}
