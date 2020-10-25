import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbatimentoItensComponent } from './abatimento-itens.component';

describe('AbatimentoItensComponent', () => {
  let component: AbatimentoItensComponent;
  let fixture: ComponentFixture<AbatimentoItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbatimentoItensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbatimentoItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
