import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacaoBancariaComponent } from './conciliacao-bancaria.component';

describe('ConciliacaoBancariaComponent', () => {
  let component: ConciliacaoBancariaComponent;
  let fixture: ComponentFixture<ConciliacaoBancariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConciliacaoBancariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacaoBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
