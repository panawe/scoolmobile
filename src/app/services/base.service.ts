import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Country} from '../models/country';
import {SchoolYear} from '../models/schoolYear';
import {EventType} from '../models/eventType';
import {TuitionType} from '../models/tuitionType';
import {Term} from '../models/term';
import {TermGroup} from '../models/termGroup';
import {Constants} from '../app.constants';
import {Department} from '../models/department';
import {Mail} from '../models/mail';
import {TimePeriod} from '../models/timePeriod';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class BaseService {
  private headers: Headers;
  public DAYS_MAP: {[key: number]: string} = {};
  public TIME_PERIOD_MAP: {[key: number]: string} = {};

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getAllCountries = (): Observable<Country[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllCountries';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Country[]>response.json())
      .catch(this.handleError);
  }

  public getAllTerms = (): Observable<Term[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllTerms';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Term[]>response.json())
      .catch(this.handleError);
  }

  public ping = (url:string): Observable<string> => {
    let actionUrl = url + '/service/base/ping';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <string>response.json())
      .catch(this.handleError);
  }


  public getSessionChart = (): Observable<any> => {
    let actionUrl = Constants.apiServer + '/service/base/getSessionChart';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAllTermGroups = (): Observable<TermGroup[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllTermGroups';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <TermGroup[]>response.json())
      .catch(this.handleError);
  }

  public getAllSchoolYears = (): Observable<SchoolYear[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllSchoolYears';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <SchoolYear[]>response.json())
      .catch(this.handleError);
  }

  public getAllEventTypes = (): Observable<EventType[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllEventTypes';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <EventType[]>response.json())
      .catch(this.handleError);
  }


  public getAllTuitionTypes = (): Observable<TuitionType[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllTuitionTypes';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <TuitionType[]>response.json())
      .catch(this.handleError);
  }

  public getAllDepartments = (): Observable<Department[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllDepartments';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Department[]>response.json())
      .catch(this.handleError);
  }

  public getAllSysConfig = (): Observable<Constants[]> => {
    let actionUrl = Constants.apiServer + '/service/base/getAllSysConfigs';
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <Constants[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  public getMarkProgress = (param: string): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/getMarkProgress';
    let toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAvgProgress = (param: number): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/getAvgProgress';
    let toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getPaymentGraph = (param: number): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/getPaymentGraph';
    let toAdd = JSON.stringify(param);
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


  public sendMassMail = (mail: Mail): Observable<boolean> => {
    let toAdd = JSON.stringify(mail);
    let actionUrl = Constants.apiServer + '/service/base/sendMassMail';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
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
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
}
