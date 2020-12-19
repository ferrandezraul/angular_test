import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOutDialog } from './log-out-dialog.component';

describe('LogOutDialogComponent', () => {
  let component: LogOutDialog;
  let fixture: ComponentFixture<LogOutDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogOutDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOutDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
