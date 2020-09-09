import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPedidosCanceladosComponent } from './relatorio-pedidos-cancelados.component';

describe('RelatorioPedidosCanceladosComponent', () => {
  let component: RelatorioPedidosCanceladosComponent;
  let fixture: ComponentFixture<RelatorioPedidosCanceladosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioPedidosCanceladosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioPedidosCanceladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
