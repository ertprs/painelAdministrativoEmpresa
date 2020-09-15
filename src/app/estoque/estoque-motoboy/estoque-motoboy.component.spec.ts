import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueMotoboyComponent } from './estoque-motoboy.component';

describe('EstoqueMotoboyComponent', () => {
  let component: EstoqueMotoboyComponent;
  let fixture: ComponentFixture<EstoqueMotoboyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoqueMotoboyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueMotoboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
