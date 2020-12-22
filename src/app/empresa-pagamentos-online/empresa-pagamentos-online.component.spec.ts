import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaPagamentosOnlineComponent } from './empresa-pagamentos-online.component';

describe('EmpresaPagamentosOnlineComponent', () => {
  let component: EmpresaPagamentosOnlineComponent;
  let fixture: ComponentFixture<EmpresaPagamentosOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaPagamentosOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaPagamentosOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
