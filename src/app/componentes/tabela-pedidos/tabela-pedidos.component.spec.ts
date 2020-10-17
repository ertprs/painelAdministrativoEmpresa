import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPedidosComponent } from './tabela-pedidos.component';

describe('TabelaPedidosComponent', () => {
  let component: TabelaPedidosComponent;
  let fixture: ComponentFixture<TabelaPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
