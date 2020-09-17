import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidacaoFinanceiraComponent } from './consolidacao-financeira.component';

describe('ConsolidacaoFinanceiraComponent', () => {
  let component: ConsolidacaoFinanceiraComponent;
  let fixture: ComponentFixture<ConsolidacaoFinanceiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidacaoFinanceiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidacaoFinanceiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
