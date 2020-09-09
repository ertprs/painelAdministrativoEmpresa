import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelRelatorioComponent } from './painel-relatorio.component';

describe('PainelRelatorioComponent', () => {
  let component: PainelRelatorioComponent;
  let fixture: ComponentFixture<PainelRelatorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelRelatorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
