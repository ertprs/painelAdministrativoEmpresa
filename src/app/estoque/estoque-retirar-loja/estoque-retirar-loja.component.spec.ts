import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueRetirarLojaComponent } from './estoque-retirar-loja.component';

describe('EstoqueRetirarLojaComponent', () => {
  let component: EstoqueRetirarLojaComponent;
  let fixture: ComponentFixture<EstoqueRetirarLojaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoqueRetirarLojaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueRetirarLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
