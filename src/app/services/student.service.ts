import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Student} from '../models/student';
import {Enrollment} from '../models/enrollment';
import {User} from '../models/user';  
import {Constants} from '../app.constants'; 
import {MarkView} from '../models/markView' 
import { SchoolYear } from '../models/schoolYear';
import {TuitionView} from '../models/tuitionView'

@Injectable()
export class StudentService {

  private actionUrl: string;
  private headers: Headers;

  public selectedStudentUserId: number;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getByUser = (user: User): Observable<Student> => {
    this.actionUrl = Constants.apiServer + '/service/student/getByUser/' + user.id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Student>response.json())
      .catch(this.handleError);
  }

  public getEnrollments = (student: Student): Observable<Enrollment[]> => {
    this.actionUrl = Constants.apiServer + '/service/student/getEnrollments/' + student.id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Enrollment[]>response.json())
      .catch(this.handleError);
  }

    public getEnrollment = (student: Student, year: SchoolYear): Observable<Enrollment> => {
    this.actionUrl = Constants.apiServer + '/service/student/getEnrollment/' + student.id +','+year.id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Enrollment>response.json())
      .catch(this.handleError);
  }

  public getTuitions = (enrollment: Enrollment): Observable<TuitionView[]> => {
    let toAdd = JSON.stringify(enrollment);
    let actionUrl = Constants.apiServer + '/service/student/getTuitions';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        if(response)
          return <TuitionView[]>response.json();
        else
          return null;
      })
      .catch(this.handleError);
  }

  public getTuitionList = (enrollment: Enrollment): Observable<TuitionView[]> => {
    let toAdd = JSON.stringify(enrollment);
    let actionUrl = Constants.apiServer + '/service/student/getTuitionList';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <TuitionView[]>response.json();
      })
      .catch(this.handleError);
  }

  public printRecap = (enrollment: Enrollment): Observable<string> => {
    let toAdd = JSON.stringify(enrollment);
    let actionUrl = Constants.apiServer + '/service/student/printRecap';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }


  public getStudentMarks = (studentYear: String): Observable<MarkView[]> => {
    let toAdd = JSON.stringify(studentYear);
    let actionUrl = Constants.apiServer + '/service/student/getStudentMarks';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <MarkView[]>response.json();
      })
      .catch(this.handleError);
  }

  public getAll = (): Observable<Student[]> => {
    this.actionUrl = Constants.apiServer + '/service/student/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Student[]>response.json())
      .catch(this.handleError);
  }

  public save = (student: Student): Observable<Student> => {
    let toAdd = JSON.stringify(student);
    let actionUrl = Constants.apiServer + '/service/student/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

 
  public delete = (student: Student): Observable<Boolean> => {
    let toAdd = JSON.stringify(student);
    let actionUrl = Constants.apiServer + '/service/student/delete';
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


  public saveEnrollment = (enrollment: Enrollment): Observable<Enrollment> => {
    let toAdd = JSON.stringify(enrollment);
    let actionUrl = Constants.apiServer + '/service/student/saveEnrollment';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveTuition = (tuitionView: Enrollment): Observable<TuitionView> => {
    let toAdd = JSON.stringify(tuitionView);
    let actionUrl = Constants.apiServer + '/service/student/saveTuition';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteEnrollment = (enrollment: Enrollment): Observable<Boolean> => {
    let toAdd = JSON.stringify(enrollment);
    let actionUrl = Constants.apiServer + '/service/student/deleteEnrollment';
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
 
 
  public addTuition = (tuitionView: TuitionView): Observable<TuitionView> => {
    let toAdd = JSON.stringify(tuitionView);
    let actionUrl = Constants.apiServer + '/service/student/addTuition';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


  public removeTuition = (tuitionView: TuitionView): Observable<TuitionView> => {
    let toAdd = JSON.stringify(tuitionView);
    let actionUrl = Constants.apiServer + '/service/student/removeTuition';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
 

  public getInscriptionChart = (): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/getInscriptionChart';
    return this.http.get(actionUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getInscriptioLevelChart = (): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/getInscriptioLevelChart';
    return this.http.get(actionUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getInscriptionCountryChart = (): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/base/getInscriptionCountryChart';
    return this.http.get(actionUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
 

  public createPayment = (parm: string): Observable<string> => {
    let toAdd = JSON.stringify(parm);
    let actionUrl = Constants.apiServer + '/service/payment/createPayment';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public makePayment = (parm: string): Observable<string> => {
    let toAdd = JSON.stringify(parm);
    let actionUrl = Constants.apiServer + '/service/payment/makePayment';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

}
