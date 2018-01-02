import {Constants} from "../../app/app.constants";
import {Class} from "../../app/models/class";
import { Course } from "../../app/models/course";
import {Exam} from "../../app/models/exam";
import {ExamType} from "../../app/models/examType";
import {MarkView} from "../../app/models/markView";
import {SchoolYear} from "../../app/models/schoolYear";
import {Subject} from "../../app/models/subject";
import {Term} from "../../app/models/term";
import {BaseService} from "../../app/services/base.service";
import {ExamService} from '../../app/services/exam.service';
import {NotesEditPage} from "./notes-edit";
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Cookie} from "ng2-cookies";

@Component({
  selector: 'page-notes-edit-main',
  templateUrl: 'notes-edit-main.html'
})
export class NotesEditMainPage {
  public exam: Exam = new Exam();
  public marks: MarkView[];
  classes: Class[];
  subjects: Subject[];
  terms: Term[];
  examTypes: ExamType[];
  public error: string;
  color: string = 'primary';
  icon: string = 'checkmark-circle';
  url: string = Constants.apiServer;
  loggedInUser = JSON.parse(Cookie.get('loggedInUser'));
  constructor(public navCtrl: NavController,
    private examService: ExamService,
    private baseService: BaseService,
    public navParams: NavParams) {

    this.baseService.getAllClasses()
      .subscribe((data: Class[]) => this.classes = data,
      error => console.log(error),
      () => console.log('Get All Classes Complete'));

    this.baseService.getAllSubjects()
      .subscribe((data: Subject[]) => this.subjects = data,
      error => console.log(error),
      () => console.log('Get All Subjects Complete'));

    this.baseService.getAllTerms()
      .subscribe((data: Term[]) => this.terms = data,
      error => console.log(error),
      () => console.log('Get All Terms Complete'));

    this.baseService.getAllExamTypes()
      .subscribe((data: ExamType[]) => this.examTypes = data,
      error => console.log(error),
      () => console.log('Get All ExamTypes Complete'));

    this.baseService.getCurrentSchoolYear()
      .subscribe((data: SchoolYear) => {
        this.exam.schoolYear = data;
      }, error => console.log(error),
      () => console.log('Get getCurrentSchoolYear Complete'));

    this.exam.examDate = new Date();
    this.exam.course = new Course();
    /*
    this.exam = navParams.get('exam');
    this.examService.getMarks(this.exam).subscribe((data: MarkView[]) => {this.marks = data;},
      error => console.log(error),
      () => console.log('Get marks'));*/
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


  save() {
    try {
      this.error = '';
      this.exam.modifiedBy = this.loggedInUser.id;
      this.examService.save(this.exam)
        .subscribe(result => {
          if (result.id > 0) {
            this.exam = result;
            this.navCtrl.push(NotesEditPage, {
              exam: this.exam
            });
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
