import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerEntregaComponent } from './dialog-ver-entrega.component';

describe('DialogVerEntregaComponent', () => {
  let component: DialogVerEntregaComponent;
  let fixture: ComponentFixture<DialogVerEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVerEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVerEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
