import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCategoriasEmpresaComponent } from './form-categorias-empresa.component';

describe('FormCategoriasEmpresaComponent', () => {
  let component: FormCategoriasEmpresaComponent;
  let fixture: ComponentFixture<FormCategoriasEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCategoriasEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCategoriasEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
