import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockInterviewService {

  private API_URL = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  AddMockInterview(mockQuestion): Observable<any> {
    console.log(mockQuestion);
    return this.http.post(this.API_URL + '/api/mock/questions', mockQuestion , {withCredentials: true})
      .pipe(tap((res) => {
      return res;
    }));
  }

  GetMockInterviewQuestions(): Observable<any> {
    return this.http.get(this.API_URL + '/api/mock/questions', {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  GetMockInterviewQuestion(_id, no): Observable<any> {
    return this.http.get(this.API_URL + `/api/mock/question/${_id}/${no}`, {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  AddMockAnswerResult(result: any) {
    return this.http.post(this.API_URL + `/api/mock/result`, result, {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  addMockAnswer(answer: { result: string; answer: string; question: string; audio: string }) {
    return this.http.post(this.API_URL + `/api/mock/answer`, answer, {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  getMockAnswerResultID(date, userId) {
    return this.http.get(this.API_URL + `/api/mock/result/${date}/${userId}`, {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  readMockResult(userId): Observable<any> {
    return this.http.get(this.API_URL + `/api/mock/result/${userId}`, {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }
}
