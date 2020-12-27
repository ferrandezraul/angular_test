import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlineacionDialogComponent } from './alineacion-dialog.component';

describe('AlineacionDialogComponent', () => {
  let component: AlineacionDialogComponent;
  let fixture: ComponentFixture<AlineacionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlineacionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlineacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
