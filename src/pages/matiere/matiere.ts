import { ResultSummaryView } from '../../app/models/resultSummaryView';
import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-matiere',
  templateUrl: 'matiere.html'
})
export class MatierePage {
  public resultSummary: ResultSummaryView = new ResultSummaryView();
  constructor(public navCtrl: NavController,public navParams: NavParams) {
    this.resultSummary = navParams.get('resultSummary');
  }  
}
