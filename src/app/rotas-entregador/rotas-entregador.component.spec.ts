import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotasEntregadorComponent } from './rotas-entregador.component';

describe('RotasEntregadorComponent', () => {
  let component: RotasEntregadorComponent;
  let fixture: ComponentFixture<RotasEntregadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotasEntregadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotasEntregadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
