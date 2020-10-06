import {AfterContentChecked, AfterContentInit, AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Question, QuestionService, QuestionTag} from '../service/question.service';
import {consoleTestResultHandler} from 'tslint/lib/test';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, AfterContentChecked {

  displayedColumns: string[] = ['number', 'description', 'answered'];

  dataSource = new MatTableDataSource();
  QAData = [];
  answerRecord = [0];
  answerRecordInit = [0];
  tagRecord = [0];

  questionTags: QuestionTag[] = [{id: '', name: ' '}]; // options in select
  filterTags: QuestionTag[] = []; // tags for filter

  isAnswerExpanded = false;
  style = '10px';
  rowHeight = 680;

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild('mainTable') elementView: ElementRef;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.GetQuestions().subscribe((QRes) => {
      this.questionService.GetAnswers(localStorage.getItem('ccggUser')).subscribe( ARes => {
        this.answerRecord[0] = ARes['length'];
        this.answerRecordInit[0] = ARes['length'];
        for (let q = 0; q < QRes.length; q++) {
          this.tagRecord[0]++;
          for (let a = 0; a < ARes['length']; a++) {
            if ( QRes[q]._id === ARes[a]['question']) {
              QRes[q].answer = ARes[a];
            }
          }
          for (let i = 0; i < QRes[q].question_tags.length; i++) {
            for (let t = 0; t < this.questionTags.length; t++) {
              if ( this.questionTags[t].name === QRes[q].question_tags[i].name) {
                this.tagRecord[t]++;
                if ( QRes[q].answer !== undefined) {
                  this.answerRecord[t]++;
                }
              }
            }
          }
        }
        // console.log(this.questionTags);
        // console.log(QRes);
        // console.log(this.answerRecord);
        // console.log(this.tagRecord);
        this.dataSource = new MatTableDataSource(QRes.sort((Q1, Q2) => {
          return Q1.No - Q2.No;
        }));
        this.QAData = this.dataSource.data;
        this.questionService.SetData(this.QAData);
        this.dataSource.paginator = this.paginator;
      });
    });


    this.questionService.GetQuestionTags().subscribe((tagArray) => {
      // console.log(tagArray);
      tagArray.forEach((tag) => this.questionTags.push(tag));
      this.style = (630 / this.questionTags.length) - 20 + 'px';
      for (let t = 0; t < this.questionTags.length; t++) {
        this.answerRecord[t] = 0;
        this.tagRecord[t] = 0;
      }
      this.answerRecordInit = this.answerRecord;
    });
  }

  // ngAfterViewChecked(): void {
  //   // console.log('AFT' + this.elementView['_elementRef'].nativeElement.offsetHeight);
  // }

  ngAfterContentChecked(): void {
    // console.log(this.elementView['_elementRef'].nativeElement.offsetHeight);
    this.answerRecord = [...this.answerRecordInit];
    // console.log(this.tagRecord);
    // console.log(this.answerRecord);
    if (this.QAData !== []) {
      const answerRecord = this.questionService.GetAnswerRecord();
      this.answerRecord[0] = this.answerRecord[0] + answerRecord.length;
      for (let q = 0; q < this.QAData.length; q++) {
        for (let a = 0; a < answerRecord['length']; a++) {
          if ( this.QAData[q]._id === answerRecord[a]['question']) {
            this.QAData[q].answer = answerRecord[a];
          }
        }
        for (let t = 0; t < this.questionTags.length; t++) {
          for (let i = 0; i < this.QAData[q].question_tags.length; i++) {
            if ( this.questionTags[t].name === this.QAData[q].question_tags[i].name) {
              if ( this.QAData[q].answer !== undefined) {
                this.answerRecord[t]++;
              }
            }
          }
        }
      }
      // console.log(this.answerRecord);
      // console.log(this.tagRecord);
      this.QAData = this.dataSource.data;
      // this.questionService.SetData(this.QAData);
      this.questionService.ClearAnswerRecord();
    }
  }

  answerExpanded(): boolean {
    this.isAnswerExpanded = !this.isAnswerExpanded;
    if (this.isAnswerExpanded === true) {
      this.rowHeight = this.rowHeight + 500;
    } else {
      this.rowHeight = this.rowHeight - 500;
    }
    return this.isAnswerExpanded;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // console.log(this.dataSource);
  }

  // <filterByTag>
  // when add tag trig filterDataByTag Or when remove tag trig removeTag to update filterTags
  // then updateDataSource updated by filterTags, finally change DOM
  filterDataByTag(tag: QuestionTag) {
    if (this.filterTags.indexOf(tag) === -1) {
      this.filterTags.push(tag);
    }
    this.updateDataSource();
  }
  removeTag($event: QuestionTag) {
    this.filterTags.splice(
      this.filterTags.map((questionTag) => questionTag.name)
        .indexOf($event.name), 1);
    this.updateDataSource();
  }
  private updateDataSource() {
    const data: Question[] = [];
    let i = 0;
    this.questionService.GetData().forEach((question: Question) => {
      if (this.checkTag(question)) {
        data[i] = question;
        i++;
      }
    });
    // console.log(data);
    this.dataSource.data = data;
  }
  private checkTag(question: Question) {
    let result = true;
    this.filterTags.forEach((filterTag) => {
      if (question.question_tags.map((question_tag) => question_tag.name).indexOf(filterTag.name) === -1) {
        result = false;
      }
    });
    return result;
  }
  // </filterByTag>


}

export interface PeriodicElement {
  number: number;
  description: string;
  suggested_answer: string;
  question_tags: string;
}
