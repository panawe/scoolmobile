import {BaseService} from '../../app/services/base.service';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { YearData } from "../../app/models/yearData";
import { PayementsAdminDtlPage } from "./payements-admin-dtl";

@Component({
  selector: 'page-payements-admin',
  templateUrl: 'payements-admin.html'
})
export class PayementsAdminPage { 

  yearDatas: YearData[]=[];

  constructor(public navCtrl: NavController,
    private baseService: BaseService) { 
      console.log('Getting year data');
    this.baseService.getYearTuition(0)
      .subscribe((data: YearData[]) => {
        this.yearDatas = data; 
        console.log(this.yearDatas);
      }, error => console.log(error),
      () => console.log('Get getYearTuition Complete'));
  }

  getYearTuitions(data) {
    this.navCtrl.push(PayementsAdminDtlPage, {
          yearData: data 
    });
  }
}
