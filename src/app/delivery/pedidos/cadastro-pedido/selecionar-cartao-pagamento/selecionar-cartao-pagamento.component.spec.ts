import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarCartaoPagamentoComponent } from './selecionar-cartao-pagamento.component';

describe('SelecionarCartaoPagamentoComponent', () => {
  let component: SelecionarCartaoPagamentoComponent;
  let fixture: ComponentFixture<SelecionarCartaoPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionarCartaoPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarCartaoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
