import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetornarDeMotoboyComponent } from './retornar-de-motoboy.component';

describe('RetornarDeMotoboyComponent', () => {
  let component: RetornarDeMotoboyComponent;
  let fixture: ComponentFixture<RetornarDeMotoboyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetornarDeMotoboyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetornarDeMotoboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
