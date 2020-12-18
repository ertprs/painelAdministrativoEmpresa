import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEmpresaLojistaComponent } from './cadastro-empresa-lojista.component';

describe('CadastroEmpresaLojistaComponent', () => {
  let component: CadastroEmpresaLojistaComponent;
  let fixture: ComponentFixture<CadastroEmpresaLojistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEmpresaLojistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEmpresaLojistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
