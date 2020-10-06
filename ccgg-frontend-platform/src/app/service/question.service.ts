import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {PeriodicElement} from '../question/question.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private API_URL = `${environment.API_URL}`;
  answerRecord = [];
  data = [];

  constructor(private http: HttpClient) {

  }

  SetData(data) {
    // console.log('setAnswerRecord');
    this.data = data;
    // console.log(data);
  }
  GetData() {
    // console.log('getAnswerRecord');
    return this.data;
  }
  SetAnswerRecord(answer) {
    // console.log('setAnswerRecord');
    let update = false;
    for (let i = 0; i < this.answerRecord.length; i++) {
      if (this.answerRecord[i].question === answer.question && answer.question !== undefined) {
        this.answerRecord[i] = answer;
        update = true;
      }
    }
    if (update === false) {
      this.answerRecord.push(answer);
    }
    // console.log(this.answerRecord);
  }
  GetAnswerRecord() {
    // console.log('getAnswerRecord');
    return this.answerRecord;
  }
  ClearAnswerRecord() {
    this.answerRecord = [];
  }

  GetQuestions(): Observable<any> {
    return this.http.get(this.API_URL + '/api/questions', {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  GetQuestion(id): Observable<any> {
    return this.http.get(this.API_URL + `/api/questions/${id}`, {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  GetQuestionTags(): Observable<any> {
    return this.http.get(this.API_URL + '/api/questions_tags', {withCredentials: true})
      .pipe(tap((res) => {
        return res;
      }));
  }

  UpdateQuestion(question) {
    return this.http.put(this.API_URL + '/api/question', question, {withCredentials: true})
      .pipe(tap(res => {
        return res;
      }));
  }

  AddQuestion(question) {
    return this.http.post(this.API_URL + '/api/question', question, {withCredentials: true})
      .pipe(tap(res => {
        return res;
      }));
  }

  GetQuestionIdByNo(No): string {
    let questionId: string = this.data[0]._id;
    this.data.forEach((question: Question) => {
      if (question.No === No) {
        questionId =  question._id;
      }
    });
    return questionId;
  }

  AddQuestionTag(questionTag) {
    // console.log(questionTag);
    return this.http.post(this.API_URL + '/api/questions_tag', questionTag, {withCredentials: true})
      .pipe(tap(res => {
        return res;
      }));
  }

  GetAnswer(user_id, question_id) {
    // console.log(user_id, '\n', question_id);
    const params = new HttpParams().set('user', user_id).set('question', question_id);
    return this.http.get(this.API_URL + '/api/answers', {params: params, withCredentials: true})
      .pipe(tap(res => {
        return res;
      }));
  }

  GetAnswers(user_id) {
    // console.log(user_id, '\nanswers');
    const params = new HttpParams().set('user', user_id);
    return this.http.get(this.API_URL + '/api/answers', {params: params, withCredentials: true})
      .pipe(tap(res => {
        return res;
      }));
  }

  SaveAnswer(traineeAnswer) {
    return this.http.post(this.API_URL + '/api/answers', traineeAnswer , {withCredentials: true})
      .pipe(tap(res => {
        return res;
      }));
  }

  updateAnswer(traineeAnswer) {
    return this.http.put(this.API_URL + '/api/answers', traineeAnswer , {withCredentials: true})
      .pipe(tap(res => {
        return res;
      }));
  }

}

export interface Question {
  _id: string;
  No: number;
  description: string;
  __v: number;
  suggested_answer: string;
  question_tags: QuestionTag[];
}

export interface QuestionTag {
  id: string;
  name: string;
}

