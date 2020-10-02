import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemPagamentoComponent } from './form-item-pagamento.component';

describe('FormItemPagamentoComponent', () => {
  let component: FormItemPagamentoComponent;
  let fixture: ComponentFixture<FormItemPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
