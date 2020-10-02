import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarMotoboyEntregaComponent } from './selecionar-motoboy-entrega.component';

describe('SelecionarMotoboyEntregaComponent', () => {
  let component: SelecionarMotoboyEntregaComponent;
  let fixture: ComponentFixture<SelecionarMotoboyEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionarMotoboyEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarMotoboyEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
