import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Painel2RelatorioComponent } from './painel2-relatorio.component';

describe('Painel2RelatorioComponent', () => {
  let component: Painel2RelatorioComponent;
  let fixture: ComponentFixture<Painel2RelatorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Painel2RelatorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Painel2RelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
