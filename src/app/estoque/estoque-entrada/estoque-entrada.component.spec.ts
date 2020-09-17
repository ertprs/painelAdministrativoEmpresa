import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueEntradaComponent } from './estoque-entrada.component';

describe('EstoqueEntradaComponent', () => {
  let component: EstoqueEntradaComponent;
  let fixture: ComponentFixture<EstoqueEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoqueEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
