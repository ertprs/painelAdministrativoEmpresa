import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistEntregaComponent } from './dialog-hist-entrega.component';

describe('DialogHistEntregaComponent', () => {
  let component: DialogHistEntregaComponent;
  let fixture: ComponentFixture<DialogHistEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHistEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHistEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
