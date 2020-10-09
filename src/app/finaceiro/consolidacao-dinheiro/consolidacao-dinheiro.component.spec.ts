import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidacaoDinheiroComponent } from './consolidacao-dinheiro.component';

describe('ConsolidacaoDinheiroComponent', () => {
  let component: ConsolidacaoDinheiroComponent;
  let fixture: ComponentFixture<ConsolidacaoDinheiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidacaoDinheiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidacaoDinheiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
