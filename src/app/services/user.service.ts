import { Constants } from '../app.constants';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';
import { StudentView } from '../models/studentView';
import { Cookie } from 'ng2-cookies/ng2-cookies';
 
@Injectable()
export class UserService {  

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getById = (user: User): Observable<User> => {
    this.actionUrl = Constants.apiServer + '/service/user/user/' + user.id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);
  }
 
  public getAll = (): Observable<User[]> => {
    this.actionUrl = Constants.apiServer + '/service/user/getUsers';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <User[]>response.json())
      .catch(this.handleError);
  }
 

 public search = (searchText: string): Observable<User[]> => {
    let toAdd = JSON.stringify(searchText);
    let actionUrl = Constants.apiServer + '/service/user/findMembers';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  }

  public getUsersForRole = (role: number): Observable<User[]> => {
    let toAdd = JSON.stringify(role);
    let actionUrl = Constants.apiServer + '/service/user/getUsersForRole';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  }
  
  public getUsersByParent = (parentId: number): Observable<User[]> => {
    let toAdd = JSON.stringify(parentId);
    let actionUrl = Constants.apiServer + '/service/user/getUsersByParentId';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  } 
  
 public getStudentUsersByParent = (parentId: number): Observable<StudentView[]> => {
    let toAdd = JSON.stringify(parentId);
    let actionUrl = Constants.apiServer + '/service/user/getStudentsByParentId';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  } 
  
  
  public login = (user: User): Observable<Boolean> => {
    let toAdd = JSON.stringify(user);
    let actionUrl = Constants.apiServer + '/service/user/login';

    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        if (response && response.json()) {
          let token = response.json() && response.json().token;
          if (token) {

            Cookie.set('user', JSON.stringify(response.json()));
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

      )
      .catch(this.handleError);
  }

  public saveUser = (user: User): Observable<string> => {
    let toAdd = JSON.stringify(user);
    let actionUrl = Constants.apiServer + '/service/user/saveUser';

    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) { 
          return response.json();
        }
      })
      .catch(this.handleError);
  }

  public save = (user: User): Observable<Boolean> => {
    let toAdd = JSON.stringify(user);
    let actionUrl = Constants.apiServer + '/service/user/createUser';


    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) {
          let token = response.json() && response.json().token;
          if (token) {
            Cookie.set('user', JSON.stringify(response.json()));
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public registerOnline = (user: User): Observable<Boolean> => {
    let toAdd = JSON.stringify(user);
    let actionUrl = Constants.apiServer + '/service/user/registerOnline';

    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) {
          let token = response.json() && response.json().token;
          if (token) {
            Cookie.set('user', JSON.stringify(response.json()));
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public sendPassword = (user: User): Observable<Boolean> => {
    let toAdd = JSON.stringify(user);
    let actionUrl = Constants.apiServer + '/service/user/sendPassword';

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

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
