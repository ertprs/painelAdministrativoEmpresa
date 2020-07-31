import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEntregadorComponent } from './dialog-entregador.component';

describe('DialogEntregadorComponent', () => {
  let component: DialogEntregadorComponent;
  let fixture: ComponentFixture<DialogEntregadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEntregadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEntregadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
