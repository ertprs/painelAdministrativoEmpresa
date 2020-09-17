import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFormapagamentoComponent } from './form-formapagamento.component';

describe('FormFormapagamentoComponent', () => {
  let component: FormFormapagamentoComponent;
  let fixture: ComponentFixture<FormFormapagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFormapagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFormapagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
