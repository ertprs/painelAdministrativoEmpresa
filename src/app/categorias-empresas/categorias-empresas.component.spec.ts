import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasEmpresasComponent } from './categorias-empresas.component';

describe('CategoriasEmpresasComponent', () => {
  let component: CategoriasEmpresasComponent;
  let fixture: ComponentFixture<CategoriasEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
