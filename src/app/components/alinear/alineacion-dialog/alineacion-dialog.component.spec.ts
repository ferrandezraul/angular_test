import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlineacionDialog } from './alineacion-dialog.component';

describe('AlineacionDialog', () => {
  let component: AlineacionDialog;
  let fixture: ComponentFixture<AlineacionDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlineacionDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlineacionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
