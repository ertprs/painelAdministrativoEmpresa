import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirMotivoEntregadorComponent } from './inserir-motivo-entregador.component';

describe('InserirMotivoEntregadorComponent', () => {
  let component: InserirMotivoEntregadorComponent;
  let fixture: ComponentFixture<InserirMotivoEntregadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InserirMotivoEntregadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirMotivoEntregadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
