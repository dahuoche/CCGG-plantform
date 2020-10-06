import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {QuestionService, QuestionTag} from "../../../service/question.service";

@Component({
  selector: 'app-question-generator',
  templateUrl: './question-generator.component.html',
  styleUrls: ['./question-generator.component.css']
})
export class QuestionGeneratorComponent implements OnInit {

  @Output() questionEmitter = new EventEmitter<object>();

  @ViewChild('QForm') newQForm: NgForm;

  tagOptions: QuestionTag[]; // for display in select
  question_tag_objs = []; // for display in app-question-tag
  question_tags = [];
  style = ['', ''];
  warnings = [];
  mdSetting = {
    mode: 'editor',
    height: '200%',
    options: {
      usingFontAwesome5: true,
      showBorder: false,
      resizable: true
    }
  };
  MockQuestion = {
    description: '',
    extra_description: '',
    question_tags: [],
    question_tag_objs : [],
    coding: false
  };

  constructor(private questionService: QuestionService,
  ) { }
  ngOnInit() {
    this.questionService.GetQuestionTags().subscribe((res) => {
      this.tagOptions = res;
    });
  }

  isCoding() {
    this.MockQuestion.coding = !this.MockQuestion.coding;
  }

  removeTag($event: QuestionTag) {
    const id = this.question_tag_objs.map((questionTag) => questionTag.name).indexOf($event.name);
    this.question_tag_objs.splice(id, 1);
    this.question_tags.splice(id, 1);
  }
  addTag(tag) {
    if (this.question_tag_objs.indexOf(tag) === -1) {
      this.question_tag_objs.push(tag);
      this.question_tags.push(tag._id);
    }
  }

  AddNewQuestion() {
    let valid = true;
    // const border = 'border: 1px solid red; border-style: outset; border-radius: 10px' ;
    if (this.newQForm.value.description === '') {
      this.style[0] = '1px solid red';
      this.warnings[0] = 'Question Title';
      valid = false;
    } else {this.style[0] = ''; this.warnings[0] = ''; }
    if (this.newQForm.value.question_tags.length === 0) {
      this.style[1] = '1px solid red';
      this.warnings[1] = 'Question Tag';
      valid = false;
    } else {this.style[1] = ''; this.warnings[1] = ''; }
    if (valid === true) {
      this.MockQuestion.description = this.newQForm.value.description;
      this.MockQuestion.extra_description = this.newQForm.value.extra_description;
      this.MockQuestion.question_tags = this.question_tags;
      this.MockQuestion.question_tag_objs = this.question_tag_objs;
      this.questionEmitter.emit(this.MockQuestion);
      this.newQForm.value.description = '';
      this.newQForm.value.extra_description = '';
      this.clear();
    } else {
      alert('unsuccessfully');
    }

  }

  clear() {
    this.question_tag_objs = [];
    this.question_tags = [];
  }
  cancel() {
    this.questionEmitter.emit(null);
  }

}
