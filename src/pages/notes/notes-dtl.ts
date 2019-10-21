import { Constants } from '../../app/app.constants';
import { AverageView } from '../../app/models/averageView';
import { MarkView } from '../../app/models/markView';
import { ResultSummaryView } from '../../app/models/resultSummaryView';
import { SchoolYear } from '../../app/models/schoolYear';
import { Student } from '../../app/models/student';
import { TermResultView } from '../../app/models/termResultView';
import { User } from '../../app/models/user';
import { ExamService } from '../../app/services/exam.service';
import { StudentService } from '../../app/services/student.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MatierePage } from '../matiere/matiere';
import { ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { YearData } from '../../app/models/yearData';

@Component({
  selector: 'page-notes-dtl',
  templateUrl: 'notes-dtl.html'
})
export class NotesDtlPage {
  year: SchoolYear;
  years: SchoolYear[];
  public marks: MarkView[] = [];
  public student: Student;
  public error: string;
  msgType: number = 1;
  @ViewChild(MatierePage) matierePage: MatierePage;
  public termResult: TermResultView = new TermResultView();
  public selectedAverage: AverageView = new AverageView();
  constructor(public navCtrl: NavController,
    private examService: ExamService, public navParams: NavParams,
    private studentService: StudentService ) {
    const user: User = JSON.parse(Cookie.get('user'));
    const yd: YearData = navParams.get('yearData2');
    this.year = yd.year;
    this.setStudent(user);   
  }
  goToMatiere(params) {
    if (!params) params = {};
    this.navCtrl.push(MatierePage);
  }

  public setStudent(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.studentService.getByUser(aUser)
        .subscribe(result => {
          this.student = result;
           this.getStudentTermResults();
        });

    }
  }

  public getStudentMarks() {
    this.termResult = new TermResultView();
    this.marks = null;
    this.error = null;
    if (this.year != null && this.student != null) {
      this.studentService.getStudentMarks(this.student.id + "," + this.year.id)
        .subscribe(result => {
          this.marks = result;
        });
    } else {
      this.error = Constants.SELECT_YEAR;
    }
  }

  public getAverages(resultSummary: ResultSummaryView) {
    this.examService.getAverages(resultSummary)
      .subscribe((data: ResultSummaryView) => {

        this.navCtrl.push(MatierePage, {
          resultSummary: data
        });

      },
        error => console.log(error),
        () => console.log('Getting Averages'));
  }

  public getStudentTermResults() {
    this.termResult = new TermResultView();
    this.marks = null;
    this.error = null;
    if (this.year != null && this.student != null && this.student.id > 0) {
      this.examService.getStudentYearResults(this.year.id + "," + this.student.id)
        .subscribe((data: TermResultView) => {
          this.termResult = data;
          if (this.termResult != null && this.termResult.resultSummaries != null && this.termResult.resultSummaries.length > 0) {
            this.msgType = 1;
          } else {
            this.msgType = 2;
          }
        });
    } else {
      this.error = Constants.SELECT_YEAR;
    }

    this.getStudentMarks();
  }


}
