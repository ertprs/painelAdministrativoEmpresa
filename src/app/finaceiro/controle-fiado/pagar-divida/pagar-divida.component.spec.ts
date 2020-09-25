import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarDividaComponent } from './pagar-divida.component';

describe('PagarDividaComponent', () => {
  let component: PagarDividaComponent;
  let fixture: ComponentFixture<PagarDividaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarDividaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarDividaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
