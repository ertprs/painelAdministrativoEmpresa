import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObservacaoPedidoComponent } from './add-observacao-pedido.component';

describe('AddObservacaoPedidoComponent', () => {
  let component: AddObservacaoPedidoComponent;
  let fixture: ComponentFixture<AddObservacaoPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObservacaoPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObservacaoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
