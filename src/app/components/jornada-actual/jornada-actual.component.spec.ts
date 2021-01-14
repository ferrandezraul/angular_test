import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JornadaActualComponent } from './jornada-actual.component';

describe('JornadaActualComponent', () => {
  let component: JornadaActualComponent;
  let fixture: ComponentFixture<JornadaActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JornadaActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JornadaActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
