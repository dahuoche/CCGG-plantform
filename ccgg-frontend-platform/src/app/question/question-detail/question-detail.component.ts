import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import {QuestionService, QuestionTag} from '../../service/question.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MdEditorOption} from 'ngx-markdown-editor';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  question;

  private id: any;

  question_desc: any;

  suggested_answer: any;

  extra_description: any;

  question_id: any;

  question_tags: any;

  mdOptions_a: MdEditorOption;

  mdOptions_e: MdEditorOption;

  extra_des: boolean;

  mode: string;

  height: string;

  isAnswerShown: boolean;

  answerMode = true;

  submitMode = false;

  mdSetting = {
    mode: 'editor',
    height: '160px',
    options: {
      usingFontAwesome5: true,
      showBorder: false,
      resizable: true
    }
  };

  questionTags: QuestionTag[] = [{id: '', name: ' '}]; // options in select

  user;

  answerObj;

  answer = '';


  @Output()
  noEmitter = new EventEmitter<number>();

  constructor(private questionService: QuestionService,
              public authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.mode = 'preview';
    this.height = '100%';

    this.mdOptions_e = {
      usingFontAwesome5: true,
      resizable: true
    };

    this.mdOptions_a = {
      usingFontAwesome5: true,
      resizable: true
    };

    this.isAnswerShown = false;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.questionService.GetQuestions().subscribe(res => this.questionService.SetData(res));
    this.updateQuestionDetail(this.id);
  }

  updateQuestionDetail(id) {
    this.questionService.GetQuestion(id).subscribe((res) => {
      this.question = res;
      this.question_desc = res.description;
      this.suggested_answer = res.suggested_answer;
      this.question_id = res.No;
      this.question_tags = res.question_tags;
      this.extra_description = res.extra_description;
      this.extra_des = this.extra_description !== undefined;
    });
    this.authService.getUser().subscribe(res => {
      this.user = res;
      // console.log(res);
      this.questionService.GetAnswer(this.user._id, this.id).subscribe(ans => {
        if (ans === null) {
          this.answer = '';
          this.submitMode = false;
        } else {
          this.answer = ans['answer'];
          this.answerObj = ans;
          // console.log(this.answerObj);
          this.submitMode = ans['submitted'];
        }
      });
      // this.questionService.GetAnswers(this.user._id).subscribe(ans => console.log(ans));
    });
  }

  suggestedAnswer() {
    this.isAnswerShown = !this.isAnswerShown;
    return this.isAnswerShown;
  }

  prevAnswer() {
    this.navigateByNo(this.question_id - 1);
  }
  nextAnswer() {
    this.navigateByNo(this.question_id + 1);
  }
  navigateByNo(No) {
    const id: string = this.questionService.GetQuestionIdByNo(No);
    this.router.navigate(['/questions/detail/' + id]);
    this.updateQuestionDetail(id);
  }

  changeInput() {
    this.answerMode = !this.answerMode;
  }

  saveAnswer() {
    this.submitMode = true;
    const traineeAnswer = {
      answer: this.answer,
      question: this.question._id,
      status: 'pending',
      submitted: true,
      user: this.user._id,
    };

    this.questionService.SetAnswerRecord(traineeAnswer);

    this.questionService.SaveAnswer(traineeAnswer).subscribe(res => {
      if (res !== null) {
        this.submitMode = true;
        alert('Successfully: ' + res['success']);
      } else {
        alert('network error');
      }
    });
  }

  updateAnswer() {
    this.answerObj['answer'] = this.answer;
    this.answerObj['status'] = 'pending';
    this.questionService.updateAnswer(this.answerObj).subscribe(res => {
      alert('Successfully?: ' + res['success']);
    });
    // console.log(this.answerObj);
  }
}


