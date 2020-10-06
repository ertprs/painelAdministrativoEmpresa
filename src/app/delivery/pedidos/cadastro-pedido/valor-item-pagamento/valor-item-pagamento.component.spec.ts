import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorItemPagamentoComponent } from './valor-item-pagamento.component';

describe('ValorItemPagamentoComponent', () => {
  let component: ValorItemPagamentoComponent;
  let fixture: ComponentFixture<ValorItemPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValorItemPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorItemPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
