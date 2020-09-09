import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensPagamentoComponent } from './itens-pagamento.component';

describe('ItensPagamentoComponent', () => {
  let component: ItensPagamentoComponent;
  let fixture: ComponentFixture<ItensPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
