import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComprasClientesComponent } from './lista-compras-clientes.component';

describe('ListaComprasClientesComponent', () => {
  let component: ListaComprasClientesComponent;
  let fixture: ComponentFixture<ListaComprasClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaComprasClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaComprasClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
