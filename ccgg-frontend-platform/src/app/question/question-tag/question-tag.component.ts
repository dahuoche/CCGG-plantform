import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-question-tag',
  templateUrl: './question-tag.component.html',
  styleUrls: ['./question-tag.component.css']
})
export class QuestionTagComponent implements OnInit {

  @Input()
  questionTags: any;

  @Output()
  removeTagEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  removeTagEmit(qtag: any) {
    this.removeTagEmitter.emit(qtag);
  }
}
