import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlineacionInvalidaDialog } from './alineacion-invalida-dialog.component';

describe('AlineacionInvalidaDialog', () => {
  let component: AlineacionInvalidaDialog;
  let fixture: ComponentFixture<AlineacionInvalidaDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlineacionInvalidaDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlineacionInvalidaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
