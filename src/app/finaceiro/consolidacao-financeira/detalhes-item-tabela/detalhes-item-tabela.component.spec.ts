import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesItemTabelaComponent } from './detalhes-item-tabela.component';

describe('DetalhesItemTabelaComponent', () => {
  let component: DetalhesItemTabelaComponent;
  let fixture: ComponentFixture<DetalhesItemTabelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesItemTabelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesItemTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
