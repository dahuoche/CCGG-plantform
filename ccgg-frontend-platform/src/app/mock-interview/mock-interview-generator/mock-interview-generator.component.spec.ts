import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockInterviewGeneratorComponent } from './mock-interview-generator.component';

describe('MockInterviewGeneratorComponent', () => {
  let component: MockInterviewGeneratorComponent;
  let fixture: ComponentFixture<MockInterviewGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockInterviewGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockInterviewGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
