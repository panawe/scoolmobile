import {Constants} from "../../app/app.constants";
import {Exam} from "../../app/models/exam";
import {MarkView} from "../../app/models/markView";
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
  color: string = 'primary';
  icon: string = 'checkmark-circle';
  url: string = Constants.apiServer;
  loggedInUser = JSON.parse(Cookie.get('loggedInUser'));
  constructor(public navCtrl: NavController,
    private examService: ExamService,
    public navParams: NavParams) {
    this.exam = navParams.get('exam');
    this.examService.getMarks(this.exam).subscribe((data: MarkView[]) => {this.marks = data;},
      error => console.log(error),
      () => console.log('Get marks'));
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

}
