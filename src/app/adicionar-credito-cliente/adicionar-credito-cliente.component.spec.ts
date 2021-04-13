import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarCreditoClienteComponent } from './adicionar-credito-cliente.component';

describe('AdicionarCreditoClienteComponent', () => {
  let component: AdicionarCreditoClienteComponent;
  let fixture: ComponentFixture<AdicionarCreditoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarCreditoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarCreditoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
