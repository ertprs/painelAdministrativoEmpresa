import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueLogisticaComponent } from './estoque-logistica.component';

describe('EstoqueLogisticaComponent', () => {
  let component: EstoqueLogisticaComponent;
  let fixture: ComponentFixture<EstoqueLogisticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoqueLogisticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueLogisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
