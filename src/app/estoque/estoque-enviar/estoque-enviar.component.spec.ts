import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueEnviarComponent } from './estoque-enviar.component';

describe('EstoqueEnviarComponent', () => {
  let component: EstoqueEnviarComponent;
  let fixture: ComponentFixture<EstoqueEnviarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoqueEnviarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueEnviarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
