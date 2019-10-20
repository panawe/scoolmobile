import {Constants} from '../../app/app.constants';
import {EventType} from "../../app/models/eventType";
import {SchoolYear} from '../../app/models/schoolYear';
import {Schooling} from '../../app/models/schooling';
import {SchoolingView} from "../../app/models/schoolingView";
import {Student} from "../../app/models/student";
import {TimePeriod} from "../../app/models/timePeriod";
import {User} from '../../app/models/user';
import {BaseService} from '../../app/services/base.service';
import {SchoolingService} from '../../app/services/schooling.service';
import { AbsensesDetailsPage } from "./absensesDetails";
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'page-absenses-edit',
  templateUrl: 'absenses-edit.html'
})
export class AbsensesEditPage {
  year: SchoolYear;
  user: User;
  schoolings: SchoolingView[] = [];
  timePeriods: TimePeriod[];
  eventTypes: EventType[];
  schooling: Schooling = new Schooling();
  currentUser: User = JSON.parse(Cookie.get('user'));
  url: string = Constants.webServer;
  error: string;
  msg: string;
  constructor(public navCtrl: NavController,
    private baseService: BaseService,
    private schoolingService: SchoolingService,
    public navParams: NavParams) {

    this.user = navParams.get('student');
    this.baseService.getCurrentSchoolYear()
      .subscribe((data: SchoolYear) => {
        this.year = data;
        if (this.year != null) {
          this.schooling.schoolYear = this.year;
          this.getUserSchoolings();
        }
      },
      error => console.log(error),
      () => console.log('Get All SchoolYears Complete'));

    this.baseService.getTimePeriods()
      .subscribe((data: TimePeriod[]) => {
        this.timePeriods = data;
      },
      error => console.log(error),
      () => console.log('Get All Time Periods'));

    this.baseService.getAllEventTypes()
      .subscribe((data: EventType[]) => this.eventTypes = data,
      error => console.log(error),
      () => console.log('Get All EventTypes Complete'));
  }

  save() {
    try {
      this.error = '';
      this.msg='';
      this.schooling.student = new Student();
      this.schooling.student.user = new User();
      this.schooling.student.user.id = this.user.id;
      this.schooling.eventDate = new Date();
      this.schoolingService.save(this.schooling)
        .subscribe(result => {
          if (result.id > 0) {
            this.schooling = result;
            var onTheFly: SchoolingView[] = [];
            onTheFly.push(this.transform());
            onTheFly.push(...this.schoolings);
            this.schoolings = onTheFly;
            this.schooling = new Schooling();
            this.msg = Constants.saveSuccess;
          }
          else {
            this.error = Constants.saveFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  public getUserSchoolings() {
    this.schoolings = [];
    this.schoolingService.getByStudentAndYear(this.user.id, this.year.id)
      .subscribe((data: SchoolingView[]) => {
        this.schoolings = data
        console.info("Schoolings: " + this.schoolings);
      },
      error => console.log(error),
      () => console.log('Get all Schoolings complete'));
  }
  transform(): SchoolingView {
    let schoolingView = new SchoolingView();
    schoolingView.id = this.schooling.id;
    schoolingView.userName = this.schooling.student.user.lastName + ' ' + this.schooling.student.user.firstName;
    schoolingView.description = this.schooling.description;
    schoolingView.eventDate = this.schooling.eventDate;
    schoolingView.eventType = this.schooling.eventType.name;
    if (this.schooling.term != null)
      schoolingView.term = this.schooling.term.name;

    if (this.schooling.schoolYear != null)
      schoolingView.year = this.schooling.schoolYear.year;

    return schoolingView;
  }
  
    public goToSchooling(schoolingId: number) {
    let schooling: Schooling;
    this.schoolingService.getById(schoolingId)
      .subscribe((data: Schooling) => {

        schooling = data
        if (schooling && schooling !== undefined && schooling.eventDate !== null) {
          schooling.eventDate = new Date(schooling.eventDate);
        }
        this.navCtrl.push(AbsensesDetailsPage, {
          schooling: schooling
        });
      },
      error => console.log(error),
      () => console.log('Get schooling complete'));

  }
}
