import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioEntregasComponent } from './relatorio-entregas.component';

describe('RelatorioEntregasComponent', () => {
  let component: RelatorioEntregasComponent;
  let fixture: ComponentFixture<RelatorioEntregasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioEntregasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
