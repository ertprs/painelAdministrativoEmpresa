import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidacaoCartaoComponent } from './consolidacao-cartao.component';

describe('ConsolidacaoCartaoComponent', () => {
  let component: ConsolidacaoCartaoComponent;
  let fixture: ComponentFixture<ConsolidacaoCartaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidacaoCartaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidacaoCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
