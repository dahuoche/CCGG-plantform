import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveNewUsersComponent } from './active-new-users.component';

describe('ActiveNewUsersComponent', () => {
  let component: ActiveNewUsersComponent;
  let fixture: ComponentFixture<ActiveNewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveNewUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveNewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
