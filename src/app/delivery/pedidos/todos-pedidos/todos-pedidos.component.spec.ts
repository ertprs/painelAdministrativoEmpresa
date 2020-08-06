import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosPedidosComponent } from './todos-pedidos.component';

describe('TodosPedidosComponent', () => {
  let component: TodosPedidosComponent;
  let fixture: ComponentFixture<TodosPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
