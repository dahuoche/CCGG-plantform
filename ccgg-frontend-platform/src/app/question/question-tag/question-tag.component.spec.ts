import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTagComponent } from './question-tag.component';

describe('QuestionTagComponent', () => {
  let component: QuestionTagComponent;
  let fixture: ComponentFixture<QuestionTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
