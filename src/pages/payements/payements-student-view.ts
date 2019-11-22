import { Enrollment } from "../../app/models/enrollment";
import { SchoolYear } from "../../app/models/schoolYear";
import { TuitionView } from '../../app/models/tuitionView';
import { User } from "../../app/models/user";
import { BaseService } from '../../app/services/base.service';
import { StudentService } from "../../app/services/student.service";
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Cookie } from "ng2-cookies";
import { Payment } from "../../app/models/payment";

@Component({
  selector: 'page-payements-student-view',
  templateUrl: 'payements-student-view.html'
})
export class PayementsStudentViewPage {
  payments: Payment[];
  payment: Payment;
  tuition: TuitionView;
  year: SchoolYear;
  color: string = 'primary';
  icon: string = 'checkmark-circle';
  user: User = JSON.parse(Cookie.get('user'));
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private baseService: BaseService, private studentService: StudentService) {
    let enr: Enrollment = new Enrollment();
    this.tuition = navParams.get('tuitionDtl');
    this.year = navParams.get('year');
    enr.schoolYear = this.year;
    this.baseService.getStudentPayments(this.tuition.studentTuitionId).subscribe((data: Payment[]) => { this.payments = data; },
      error => console.log(error),
      () => console.log('getStudentPayments'));
  }

  public savePayment(payment: Payment) {
    this.color = 'danger';
    this.icon = 'close-circle';
    const index = this.payments.indexOf(payment);
    payment.modifiedBy = this.user.id;
    this.studentService.savePayment(payment).subscribe((data: Payment) => {
      payment = data;
      this.payments[index] = payment;
      var onTheFly: Payment[] = [];
      onTheFly.push(...this.payments);
      this.payments = onTheFly;
      this.color = 'secondary';
      this.icon = 'checkmark-circle';
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Payment'));
  }
}
