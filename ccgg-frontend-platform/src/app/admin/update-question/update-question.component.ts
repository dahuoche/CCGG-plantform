import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {QuestionService, QuestionTag} from '../../service/question.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  @ViewChild('QForm')upQForm: NgForm;

  tagOptions: QuestionTag[]; // for display in select
  question = {
    _id: '',
    No: 0,
    description: '',
    suggested_answer: '',
    extra_description: '',
    question_tags : []
  };
  mdSetting = {
    mode: 'editor',
    height: '200%',
    options: {
      usingFontAwesome5: true,
      showBorder: false,
      resizable: true
    }
  };

  constructor(private questionService: QuestionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.questionService.GetQuestionTags().subscribe((res) => {
      this.tagOptions = res;
    });
    let id = '';
    this.activatedRoute.paramMap.subscribe((param) => {
      id = param.get('id');
    });
    this.questionService.GetQuestion(id).subscribe((res) => {
      this.question = res;
    });
  }

  removeTag($event: QuestionTag) {
    this.question.question_tags.splice(
      this.question.question_tags.map((questionTag) => questionTag.name).indexOf($event.name)
      , 1);
  }
  addTag(tag) {
    if (this.question.question_tags.map((questionTag) => questionTag.name).indexOf(tag.name) === -1) {
      this.question.question_tags.push(tag);
    }
  }

  AddNewQuestion() {
    const QTags: QuestionTag[] = [];
    for (let i = 0; i < this.question.question_tags.length; i++) {
      QTags[i] = this.question.question_tags[i];
      this.question.question_tags[i] = this.question.question_tags[i]._id;
    }
    // console.log(this.question);
    let response = '';
    this.questionService.UpdateQuestion(this.question).subscribe((res) => {
      response = res['success'];
      console.log(response);
    });
    this.question.question_tags = QTags;
    // console.log(this.question.question_tags);
    this.router.navigate(['/questions/detail/' + this.question._id]);

  }

}
