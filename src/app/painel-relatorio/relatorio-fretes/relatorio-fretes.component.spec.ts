import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFretesComponent } from './relatorio-fretes.component';

describe('RelatorioFretesComponent', () => {
  let component: RelatorioFretesComponent;
  let fixture: ComponentFixture<RelatorioFretesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioFretesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioFretesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
