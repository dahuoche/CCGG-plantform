import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {QuestionService, QuestionTag} from '../../service/question.service';

@Component({
  selector: 'app-add-new-question-tag',
  templateUrl: './add-new-question-tag.component.html',
  styleUrls: ['./add-new-question-tag.component.css']
})
export class AddNewQuestionTagComponent implements OnInit {

  @ViewChild('QTForm') QTForm: NgForm;

  style = ['', ''];
  warnings = [];
  tags = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.GetQuestionTags().subscribe((res) => {
      res.forEach((tag) => this.tags.push(tag.name));
      // console.log(this.tags);
    });
  }

  AddNewQuestionTag() {
    let valid = true;
    // const border = 'border: 1px solid red; border-style: outset; border-radius: 10px' ;
    if (this.QTForm.value.name === '') {
      this.style[0] = '1px solid red';
      this.warnings[0] = 'Question Tag is required to submit a new question';
      valid = false;
    } else {this.style[0] = ''; this.warnings[0] = ''; }

    for (let t = 0; t < this.tags.length; t++) {
      if (this.QTForm.value.name.trim().toLowerCase() === this.tags[t].trim().toLowerCase() ) {
        console.log(this.QTForm.value.name.trim().toLowerCase());
        this.style[t + 1] = '3px solid red';
        this.warnings[1] = 'Tag: ' + this.tags[t] + ' is already existed';
        valid = false;
      }
    }

    if (valid === true) {
      this.questionService.AddQuestionTag(this.QTForm.value)
        .subscribe((res) => {
          alert('Successfully' + res['success']);
        });
    } else {
      alert('unsuccessfully');
    }
  }

  clear() {
  }
}
