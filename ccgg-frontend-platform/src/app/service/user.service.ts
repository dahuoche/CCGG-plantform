import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  GetUserList(): Observable<any> {
    return this.http.get(this.API_URL + '/users', {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  GetUser(id): Observable<any> {
    return this.http.get(this.API_URL + `/user/${id}`, {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  GetUserRoles(): Observable<any> {
    return this.http.get(this.API_URL + `/api/roles`, {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  GetUserBatches(): Observable<any> {
    return this.http.get(this.API_URL + `/api/batches`, {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  GetBatch(id): Observable<any> {
    return this.http.get(this.API_URL + `/api/batches/${id}`, {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  UpdateUser(userInfo) {
    // console.log(userInfo);
    return this.http.put(this.API_URL + '/users', userInfo , {withCredentials: true})
      .pipe(tap((res) => {
        // console.log(res);
        return res;
    }));

    // window.location.reload();
  }

  AddNewBatch(batch) {
    return this.http.post(this.API_URL + '/api/batch', batch , {withCredentials: true})
      // .pipe(tap((res) => {
      //   console.log(res);
      //   return res;
      // }));
    // console.log(batch);
  }
}
