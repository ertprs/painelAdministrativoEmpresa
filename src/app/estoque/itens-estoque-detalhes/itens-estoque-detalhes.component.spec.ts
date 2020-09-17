import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensEstoqueDetalhesComponent } from './itens-estoque-detalhes.component';

describe('ItensEstoqueDetalhesComponent', () => {
  let component: ItensEstoqueDetalhesComponent;
  let fixture: ComponentFixture<ItensEstoqueDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensEstoqueDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensEstoqueDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
