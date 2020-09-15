import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensEstoqueComponent } from './itens-estoque.component';

describe('ItensEstoqueComponent', () => {
  let component: ItensEstoqueComponent;
  let fixture: ComponentFixture<ItensEstoqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensEstoqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
