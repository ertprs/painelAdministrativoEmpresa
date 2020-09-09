import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFpComponent } from './relatorio-fp.component';

describe('RelatorioFpComponent', () => {
  let component: RelatorioFpComponent;
  let fixture: ComponentFixture<RelatorioFpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioFpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioFpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
