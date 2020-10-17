import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacaoEntregadorComponent } from './organizacao-entregador.component';

describe('OrganizacaoEntregadorComponent', () => {
  let component: OrganizacaoEntregadorComponent;
  let fixture: ComponentFixture<OrganizacaoEntregadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizacaoEntregadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacaoEntregadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
