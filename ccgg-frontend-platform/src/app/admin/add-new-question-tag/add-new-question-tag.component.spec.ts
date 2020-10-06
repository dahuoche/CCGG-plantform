import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewQuestionTagComponent } from './add-new-question-tag.component';

describe('AddNewQuestionTagComponent', () => {
  let component: AddNewQuestionTagComponent;
  let fixture: ComponentFixture<AddNewQuestionTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewQuestionTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewQuestionTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
