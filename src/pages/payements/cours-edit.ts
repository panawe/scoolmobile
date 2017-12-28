import {Course} from "../../app/models/course";
import {SyllabusView} from "../../app/models/syllabusView";
import {User} from '../../app/models/user';
import {SyllabusService} from "../../app/services/syllabus.service";
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'page-cours-edit',
  templateUrl: 'cours-edit.html'
})
export class CoursEditPage {
  syllabuses: SyllabusView[];
  course: Course = new Course();
  user: User = JSON.parse(Cookie.get('loggedInUser'));
  constructor(public navCtrl: NavController,
    private syllabusService: SyllabusService,
    public navParams: NavParams) {
    this.course = navParams.get('course');
    this.getSyllabuses();
  }
  public getSyllabuses() {
    this.syllabusService.getSyllabuses(this.course.id + '', this.course.classe.level.id + '',
      this.course.subject.id + '')
      .subscribe((data: SyllabusView[]) => {
        this.syllabuses = data
      },
      error => console.log(error),
      () => console.log('Get syllabuses complete'));
  }

  public saveSyllabusEvent(event) {
    this.syllabusService.save(event.data).subscribe((data: SyllabusView) => {
      this.syllabuses[this.syllabuses.indexOf(event.data)] = data;
      var onTheFly: SyllabusView[] = [];
      onTheFly.push(...this.syllabuses);
      this.syllabuses = onTheFly;
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Syllabus'));
  }

  public saveSyllabus(syllabusView) {
    var sy: SyllabusView = syllabusView;
    this.syllabusService.save(sy).subscribe((data: SyllabusView) => {
      this.syllabuses[this.syllabuses.indexOf(syllabusView)] = data;
      const onTheFly: SyllabusView[] = [];
      onTheFly.push(...this.syllabuses);
      this.syllabuses = onTheFly;
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Syllabus'));
  }

  public saveSyllabusStatus(syllabusView) {
    const sy: SyllabusView = syllabusView;
    this.syllabusService.saveStatus(sy).subscribe((data: SyllabusView) => {
      this.syllabuses[this.syllabuses.indexOf(syllabusView)] = data;
      const onTheFly: SyllabusView[] = [];
      onTheFly.push(...this.syllabuses);
      this.syllabuses = onTheFly;
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Syllabus'));
  }
}
