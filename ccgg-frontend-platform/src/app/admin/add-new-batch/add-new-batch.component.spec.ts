import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBatchComponent } from './add-new-batch.component';

describe('AddNewBatchComponent', () => {
  let component: AddNewBatchComponent;
  let fixture: ComponentFixture<AddNewBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
