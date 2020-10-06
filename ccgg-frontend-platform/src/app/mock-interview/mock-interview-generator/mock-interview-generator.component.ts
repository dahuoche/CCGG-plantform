import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {MockInterviewService} from "../../service/mock-interview.service";
import {AuthService} from "../../service/auth.service";
import {concatMap, flatMap, map, mergeMap} from "rxjs/operators";
import {forkJoin, Observable} from "rxjs";
import { of } from 'rxjs';
import {nextContext} from "@angular/core/src/render3";

@Component({
  selector: 'app-mock-interview-generator',
  templateUrl: './mock-interview-generator.component.html',
  styleUrls: ['./mock-interview-generator.component.css']
})
export class MockInterviewGeneratorComponent implements OnInit {

  author = {role: {name: ''}, name: ''};
  batches = [];
  batch = {};
  questions = [];

  displayAddQuestion = false;

  constructor(public authService: AuthService,
              public userService: UserService,
              public MockInterview: MockInterviewService) { }

  ngOnInit() {
    forkJoin([this.authService.getUser(), this.userService.GetUserBatches()])
      .subscribe(res => {
        this.author = res[0];
        res[1].forEach( r1 => {
          if (res[0].name === r1.trainer) this.batches.push(r1)
        })
      });

  }

  AddQuestion() {
    this.displayAddQuestion = true;
  }

  resetQuestions(index, questions) {
    this.questions = [...this.questions]
    return index;
  }
  setQuestion($event: object) {
    //app.post('/api/mock/questions', addMockQuestions);
    if($event === null) {
      this.displayAddQuestion = false;
    }else{
      this.questions.push(JSON.parse(JSON.stringify($event))) ;
      this.displayAddQuestion = false;
    }
    this.resetQuestions(0, this.questions);
  }
  removeQuestion(index) {
    this.questions.splice(index,1);
  }
  upQuestion(index) {
    if(index === 0) {
      return;
    }else{
      let temp = this.questions[index-1];
      this.questions[index-1] = this.questions[index];
      this.questions[index] = temp;
    }
  }
  downQuestion(index) {
    if(index === this.questions.length) {
      return;
    }else{
      let temp = this.questions[index+1];
      this.questions[index+1] = this.questions[index];
      this.questions[index] = temp;
    }
  }
  updateQuestion(index: number) {

  }

  submitInterview() {
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].no = i + 1;
      this.questions[i].batch = this.batch['_id'];
      delete this.questions[i].question_tag_objs;
      this.MockInterview.AddMockInterview(this.questions[i]).subscribe((res) => {
        return res;
      });
    }
  }

}
