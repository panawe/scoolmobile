import { SchoolYear } from '../../app/models/schoolYear';
import { Schooling } from '../../app/models/schooling';
import { SchoolingView } from '../../app/models/schoolingView';
import { User } from '../../app/models/user';
import { SchoolingService } from '../../app/services/schooling.service';
import { AbsensesDetailsPage } from './absensesDetails';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Cookie } from 'ng2-cookies';
import { YearData } from '../../app/models/yearData';

@Component({
  selector: 'page-absenses-dtl',
  templateUrl: 'absenses-dtl.html'
})
export class AbsensesDtlPage {
  year: SchoolYear;
  years: SchoolYear[];
  schoolings: SchoolingView[] = [];
  currentUser: User = JSON.parse(Cookie.get('user'));
  cols: any[]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private schoolingService: SchoolingService) {

    const yd: YearData = navParams.get('yearData3');

    this.year = yd.year;

    this.getUserSchoolings(navParams.get('user'));

    if (this.currentUser == null) {
      this.currentUser = new User();
    }

  }

  public getUserSchoolings(aUser: User) {
    this.schoolings = [];
    this.schoolingService.getByStudentAndYear(aUser.id, this.year.id)
      .subscribe((data: SchoolingView[]) => {
        this.schoolings = data
        console.info("Schoolings: " + this.schoolings);
      },
        error => console.log(error),
        () => console.log('Get all Schoolings complete'));
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
