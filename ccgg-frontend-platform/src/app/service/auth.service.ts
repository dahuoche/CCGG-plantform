import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {HttpClient} from '@angular/common/http';
import {parseCookieValue} from '@angular/common/src/cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username: string;

  // public role: string;

  private API_URL = `${environment.API_URL}`;

  loggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);
  authName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user): Observable<any> {
    return this.http.post(this.API_URL + '/auth/login', user, {withCredentials: true})
      .pipe(tap((res) => {
        this.loggedIn.next(res.success);
        if (res.token !== undefined) {
          localStorage.setItem('ccggToken', res.token);
          localStorage.setItem('ccggUser', res._id);
          this.router.navigate(['/home']);
        }
        return res;
      }));
  }

  // getRole(): Observable<any> {
  //   return this.http.post(this.API_URL + '/getUser', localStorage.getItem('ccggUser'), {withCredentials: true})
  //     .pipe(map(res) => {
  //   })
  // }

  logout() {
    localStorage.removeItem('ccggToken');
    localStorage.removeItem('ccggUser');
    this.loggedIn.next(false);
    this.authName.next('');
  }

  signup(user): Observable<any> {
    return this.http.post(this.API_URL + '/auth/regist', user)
      .pipe(tap(res => {
        // console.log(res);
        if (res.success) {
          this.router.navigate(['/login']);
        }
      }));
  }

  getUser(): Observable<any> {
    return this.http.get(this.API_URL + '/user/' + localStorage.getItem('ccggUser'), {withCredentials: true})
      .pipe(tap(res => {
        // console.log(res.json());
        this.username = res.name;
        this.authName.next(res.role.name);
        // this.role = res.role.name;
        return res;
      }));
  }

  getAllTempUser(): Observable<any> {
    return this.http.get(this.API_URL + '/regist/users', {withCredentials: true})
      .pipe(tap(res => {
        return res;
      }));
  }

  getAllRoles(): Observable<any> {
    return this.http.get(this.API_URL + '/roles', {withCredentials: true})
      .pipe(tap(res => {
        return res;
      }));
  }

  DeleteTempUser(id): Observable<any> {
    return this.http.delete(this.API_URL + '/regist/' + id, {withCredentials: true})
      .pipe(tap(res => {
        return res;
      }));
  }

  getToken(): string{
    return localStorage.getItem('ccggToken');
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
