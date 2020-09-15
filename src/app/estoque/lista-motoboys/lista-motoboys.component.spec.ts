import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMotoboysComponent } from './lista-motoboys.component';

describe('ListaMotoboysComponent', () => {
  let component: ListaMotoboysComponent;
  let fixture: ComponentFixture<ListaMotoboysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMotoboysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMotoboysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
