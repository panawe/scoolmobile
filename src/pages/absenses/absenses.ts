import { User } from '../../app/models/user';
import { BaseService } from '../../app/services/base.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Cookie } from 'ng2-cookies';
import { AbsensesDtlPage } from './absenses-dtl';
import { StudentService } from '../../app/services/student.service';
import { YearData } from '../../app/models/yearData';
import { Student } from '../../app/models/student';

@Component({
  selector: 'page-absenses',
  templateUrl: 'absenses.html'
})
export class AbsensesPage {
  currentUser: User = JSON.parse(Cookie.get('user'));
  yearDatas: YearData[] = [];
  public student: Student;
  constructor(public navCtrl: NavController,
    private studentService: StudentService,
    private baseService: BaseService) {
    const user: User = JSON.parse(Cookie.get('user'));
    this.setStudent(user);

    if (this.currentUser == null) {
      this.currentUser = new User();
    }
  }

  public setStudent(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.studentService.getByUser(aUser)
        .subscribe(result => {
          this.student = result;
          console.log('Getting year data');
          this.baseService.getYearAttendance(this.student.id)
            .subscribe((data: YearData[]) => {
              this.yearDatas = data;
              console.log(this.yearDatas);
            }, error => console.log(error),
              () => console.log('Get getYearAttendance Complete'));
        });

    }
  }

  getYearAttendance(data) {
    this.navCtrl.push(AbsensesDtlPage, {
      yearData3: data, 
      user:this.currentUser
    });
  }
 
}
