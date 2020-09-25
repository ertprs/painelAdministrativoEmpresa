import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosFiadoComponent } from './pedidos-fiado.component';

describe('PedidosFiadoComponent', () => {
  let component: PedidosFiadoComponent;
  let fixture: ComponentFixture<PedidosFiadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosFiadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosFiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
