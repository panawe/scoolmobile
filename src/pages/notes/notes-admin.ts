import {Constants} from '../../app/app.constants';
import {Exam} from "../../app/models/exam"; 
import {ExamService} from '../../app/services/exam.service';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NotesEditPage} from './notes-edit'; 

@Component({
  selector: 'page-notes-admin',
  templateUrl: 'notes-admin.html'
})
export class NotesAdminPage {
  public exams: Exam[];
  searchText: string;
  public error: string;
  constructor(public navCtrl: NavController,
    private examService: ExamService) {

  } 

  public search() {
    this.error = null;
    this.exams = [];
    if (this.searchText != null) {
      this.examService.search(this.searchText).subscribe((data: Exam[]) => {
        this.exams = data;
        if (this.exams == null || this.exams.length <= 0) {
          this.error = Constants.NO_EXAM_FOUND;
        }
      },
        error => console.log(error),
        () => console.log('Find exams with name like ' + this.searchText));
    }
  }

  chooseExam(aExam){
      this.navCtrl.push(NotesEditPage, {
      exam: aExam
    });
  }


}
