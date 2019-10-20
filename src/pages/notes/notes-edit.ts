import {Constants} from "../../app/app.constants";
import {Exam} from "../../app/models/exam";
import {MarkView} from "../../app/models/markView";
import {Teacher} from "../../app/models/teacher";
import {ExamService} from '../../app/services/exam.service';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Cookie} from "ng2-cookies";

@Component({
  selector: 'page-notes-edit',
  templateUrl: 'notes-edit.html'
})
export class NotesEditPage {
  public exam: Exam;
  public marks: MarkView[];
  searchText: string;
  public error: string;
  msg: string;
  color: string = 'primary';
  icon: string = 'checkmark-circle';
  url: string = Constants.webServer;
  loggedInUser = JSON.parse(Cookie.get('loggedInUser'));
  constructor(public navCtrl: NavController,
    private examService: ExamService,
    public navParams: NavParams) {
    this.exam = navParams.get('exam');
    if (this.exam == null) {
      this.exam = new Exam();
    } else {
      this.examService.getMarks(this.exam).subscribe((data: MarkView[]) => {this.marks = data;},
        error => console.log(error),
        () => console.log('Get marks'));

      if (this.exam.course.teacher == null) {
        this.exam.course.teacher = new Teacher();
      }
    }

  }

  public saveMark(aMark: MarkView) {
    let markView: MarkView = aMark;
    markView.approvedBy = this.loggedInUser.id;
    markView.maxMark = this.exam.maxMark;
    markView.examId = this.exam.id;
    this.color = 'danger';
    this.icon = 'close-circle';
    if (!aMark.mark || aMark.mark > aMark.maxMark || aMark.mark < 0) {
      this.color = 'danger';
      this.icon = 'close-circle';
    } else
      this.examService.saveMark(aMark).subscribe((data: MarkView) => {
        markView = data;
        this.marks[this.marks.indexOf(aMark)] = markView;
        var onTheFly: MarkView[] = [];
        onTheFly.push(...this.marks);
        this.marks = onTheFly;
        if (markView.error) {
          this.color = 'danger';
          this.icon = 'close-circle';
        } else {
          this.color = 'secondary';
          this.icon = 'checkmark-circle';
        }
        console.log(data);
      },
        error => console.log(error),
        () => console.log('Save Mark'));
  }
  
  publish(){
      try {
      this.error = '';
      this.msg='';
      this.exam.modifiedBy = this.loggedInUser.id;
      this.exam.publishMarks=true;
      this.examService.save(this.exam)
        .subscribe(result => {
          if (result.id > 0) {
            this.exam = result; 
            this.msg=Constants.GRADE_PUBLISHED;
          }
          else {
            this.error = result.error;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

}
