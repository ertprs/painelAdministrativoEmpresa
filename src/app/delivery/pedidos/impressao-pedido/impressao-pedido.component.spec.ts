import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressaoPedidoComponent } from './impressao-pedido.component';

describe('ImpressaoPedidoComponent', () => {
  let component: ImpressaoPedidoComponent;
  let fixture: ComponentFixture<ImpressaoPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpressaoPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressaoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
