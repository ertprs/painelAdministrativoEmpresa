import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioItensComponent } from './relatorio-itens.component';

describe('RelatorioItensComponent', () => {
  let component: RelatorioItensComponent;
  let fixture: ComponentFixture<RelatorioItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioItensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
