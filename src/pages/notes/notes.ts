import { Student } from '../../app/models/student';
import { User } from '../../app/models/user';
import { BaseService } from '../../app/services/base.service';
import { StudentService } from '../../app/services/student.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { YearData } from '../../app/models/yearData';
import { NotesDtlPage } from './notes-dtl';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {
  yearDatas: YearData[] = [];
  public student: Student;
  constructor(public navCtrl: NavController,
    private studentService: StudentService,
    private baseService: BaseService) {
    const user: User = JSON.parse(Cookie.get('user'));
    this.setStudent(user);
  }

  public setStudent(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.studentService.getByUser(aUser)
        .subscribe(result => {
          this.student = result;
          console.log('Getting year data');
          this.baseService.getYearMarks(this.student.id)
            .subscribe((data: YearData[]) => {
              this.yearDatas = data;
              console.log(this.yearDatas);
            }, error => console.log(error),
              () => console.log('Get getYearMarks Complete'));
        });

    }
  }

  getYearMarks(data) {
    this.navCtrl.push(NotesDtlPage, {
      yearData2: data
    });
  }
}
