import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Country } from '../models/country';
import { SchoolYear } from '../models/schoolYear';
import { EventType } from '../models/eventType';
import { TuitionType } from '../models/tuitionType';
import { Term } from '../models/term';
import { TermGroup } from '../models/termGroup';
import { Constants } from '../app.constants';
import { Class } from "../models/class";
import { Department } from '../models/department';
import { Enrollment } from "../models/enrollment";
import { ExamType } from "../models/examType";
import { Mail } from '../models/mail';
import { SDMessage } from '../models/sdMessage';
import { Subject } from "../models/subject";
import { TimePeriod } from '../models/timePeriod';
import { TuitionView } from "../models/tuitionView";
import { Client } from '../models/client';
import { YearData } from '../models/yearData';
import { Payment } from '../models/payment';

@Injectable()
export class BaseService {
  private headers: Headers;
  public DAYS_MAP: { [key: number]: string } = {};
  public TIME_PERIOD_MAP: { [key: number]: string } = {};

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getAllClasses = (): Observable<Class[]> => {
    const actionUrl = Constants.apiServer + '/service/class/getAll';
    return this.http.get(actionUrl)
      .map((response: Response) => <Class[]>response.json())
      .catch(this.handleError);
  }

  public getYearTuition = (id: number): Observable<YearData[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getYearTuition/' + id;
    return this.http.get(actionUrl)
      .map((response: Response) => <YearData[]>response.json())
      .catch(this.handleError);
  }

  public getYearMarks = (id: number): Observable<YearData[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getYearMarks/' + id;
    return this.http.get(actionUrl)
      .map((response: Response) => <YearData[]>response.json())
      .catch(this.handleError);
  }

  public getYearAttendance = (id: number): Observable<YearData[]> => {
    const actionUrl = Constants.apiServer + '/service/base/getYearAttendance/' + id;
    return this.http.get(actionUrl)
      .map((response: Response) => <YearData[]>response.json())
      .catch(this.handleError);
  }

  public getAllSubjects = (): Observable<Subject[]> => {
    const actionUrl = Constants.apiServer + '/service/subject/getAll';
    return this.http.get(actionUrl)
      .map((response: Response) => <Subject[]>response.json())
      .catch(this.handleError);
  }
  public getAllExamTypes = (): Observable<ExamType[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllExamTypes';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <ExamType[]>response.json())
      .catch(this.handleError);
  }
  public getCurrentSchoolYear = (): Observable<SchoolYear> => {
    let actionUrl = Constants.apiServer + '/service/base/getCurrentSchoolYear';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <SchoolYear>response.json())
      .catch(this.handleError);
  }

  public getAllCountries = (): Observable<Country[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllCountries';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <Country[]>response.json())
      .catch(this.handleError);
  }

  public getAllTerms = (): Observable<Term[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllTerms';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <Term[]>response.json())
      .catch(this.handleError);
  }

  public ping = (url: string): Observable<string> => {
    let actionUrl = url + '/service/base/ping';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <string>response.json())
      .catch(this.handleError);
  }


  public getSessionChart = (): Observable<any> => {
    let actionUrl = Constants.apiServer + '/service/base/getSessionChart';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAllTermGroups = (): Observable<TermGroup[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllTermGroups';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <TermGroup[]>response.json())
      .catch(this.handleError);
  }

  public getAllSchoolYears = (): Observable<SchoolYear[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllSchoolYears';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <SchoolYear[]>response.json())
      .catch(this.handleError);
  }

  public getAllEventTypes = (): Observable<EventType[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllEventTypes';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <EventType[]>response.json())
      .catch(this.handleError);
  }


  public getAllTuitionTypes = (): Observable<TuitionType[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllTuitionTypes';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <TuitionType[]>response.json())
      .catch(this.handleError);
  }

  public getAllDepartments = (): Observable<Department[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllDepartments';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <Department[]>response.json())
      .catch(this.handleError);
  }

  public getAllSysConfig = (): Observable<Constants[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllSysConfigs';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <Constants[]>response.json())
      .catch(this.handleError);
  }

  public getActiveClients = (): Observable<Client[]> => {
    let actionUrl = 'http://www.softenza.com/service/base/getActiveClients';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <Client[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  public getMarkProgress = (param: string): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/getMarkProgress';
    let toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public markSDMessageAsRead = (param: SDMessage): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/markSDMessageAsRead';
    let toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteSDMessage = (param: SDMessage): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/deleteSDMessage';
    let toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public sendSDMessage = (param: SDMessage): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/sendSDMessage';
    let toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAvgProgress = (param: number): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/getAvgProgress';
    let toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getPaymentGraph = (param: number): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/getPaymentGraph';
    let toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getPaymentGraphTotal = (param: number): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/getPaymentGraphTotal';
    let toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public sendMassMail = (mail: Mail): Observable<boolean> => {
    let toAdd = JSON.stringify(mail);
    let actionUrl = Constants.apiServer + '/service/base/sendMassMail';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() == 'Success') {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public getTimePeriods = (): Observable<TimePeriod[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllTimePeriods';
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getUserSDMessages = (userId: number, period: number, msgType: number): Observable<SDMessage[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getUserSDMessages/' + userId + '/' + period + '/' + msgType;
    return this.http.get(actionUrl)
      .map((response: Response) => <SDMessage[]>response.json())
      .catch(this.handleError);
  }

  public getSentSDMessages = (userId: number, period: number): Observable<SDMessage[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getSentSDMessages/' + userId + '/' + period;
    return this.http.get(actionUrl)
      .map((response: Response) => <SDMessage[]>response.json())
      .catch(this.handleError);
  }
  public countSDMessages = (userId: number, period: number): Observable<number> => {
    let actionUrl = Constants.apiServer + '/service/base/countSDMessages/' + userId + '/' + period;
    return this.http.get(actionUrl)
      .map((response: Response) => <number>response.json())
      .catch(this.handleError);
  }

  public countSDMessagesByType = (userId: number, period: number): Observable<number[]> => {
    let actionUrl = Constants.apiServer + '/service/base/countSDMessagesByType/' + userId + '/' + period;
    return this.http.get(actionUrl)
      .map((response: Response) => <number[]>response.json())
      .catch(this.handleError);
  }


  public getTuitions = (sy: SchoolYear): Observable<TuitionView[]> => {
    let toAdd = JSON.stringify(sy);
    let actionUrl = Constants.apiServer + '/service/base/getTuitions';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response)
          return <TuitionView[]>response.json();
        else
          return null;
      })
      .catch(this.handleError);
  }
  public getStudentTuitions = (enrollment: Enrollment): Observable<TuitionView[]> => {
    let toAdd = JSON.stringify(enrollment);
    let actionUrl = Constants.apiServer + '/service/student/getTuitions';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response)
          return <TuitionView[]>response.json();
        else
          return null;
      })
      .catch(this.handleError);
  }

  public getStudentPayments = (studentTuitionId: number): Observable<Payment[]> => {
    let actionUrl = Constants.apiServer + '/service/student/getStudentPayments/' + studentTuitionId;
    return this.http.get(actionUrl)
      .map((response: Response) => {
        if (response)
          return <Payment[]>response.json();
        else
          return null;
      })
      .catch(this.handleError);
  }
  public getClassTuitions = (tv: TuitionView): Observable<TuitionView[]> => {
    let toAdd = JSON.stringify(tv);
    let actionUrl = Constants.apiServer + '/service/base/getClassTuitions';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response)
          return <TuitionView[]>response.json();
        else
          return null;
      })
      .catch(this.handleError);
  }
}
