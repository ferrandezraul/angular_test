import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlineacionValidaDialog } from './alineacion-valida-dialog.component';

describe('AlineacionValidaDialog', () => {
  let component: AlineacionValidaDialog;
  let fixture: ComponentFixture<AlineacionValidaDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlineacionValidaDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlineacionValidaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
