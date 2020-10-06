import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MdEditorOption} from 'ngx-markdown-editor';
import {QuestionService, QuestionTag} from '../../service/question.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.css']
})
export class AddNewQuestionComponent implements OnInit {

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

  constructor(private questionService: QuestionService,
              ) { }
  ngOnInit() {
    this.questionService.GetQuestionTags().subscribe((res) => {
      this.tagOptions = res;
    });
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
      this.questionService.AddQuestion(this.newQForm.value).subscribe((res) => {
        alert('Successfully: ' + res['success']);
      });
    } else {
      alert('unsuccessfully');
    }

  }

  clear() {
    this.question_tag_objs = [];
    this.question_tags = [];
  }
}
