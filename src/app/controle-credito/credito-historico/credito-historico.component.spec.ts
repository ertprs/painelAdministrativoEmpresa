import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoHistoricoComponent } from './credito-historico.component';

describe('CreditoHistoricoComponent', () => {
  let component: CreditoHistoricoComponent;
  let fixture: ComponentFixture<CreditoHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditoHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditoHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
