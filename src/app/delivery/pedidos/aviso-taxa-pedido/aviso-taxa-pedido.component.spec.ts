import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoTaxaPedidoComponent } from './aviso-taxa-pedido.component';

describe('AvisoTaxaPedidoComponent', () => {
  let component: AvisoTaxaPedidoComponent;
  let fixture: ComponentFixture<AvisoTaxaPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoTaxaPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoTaxaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
