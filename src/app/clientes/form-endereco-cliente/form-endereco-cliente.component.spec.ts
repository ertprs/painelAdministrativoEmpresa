import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnderecoClienteComponent } from './form-endereco-cliente.component';

describe('FormEnderecoClienteComponent', () => {
  let component: FormEnderecoClienteComponent;
  let fixture: ComponentFixture<FormEnderecoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEnderecoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEnderecoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
