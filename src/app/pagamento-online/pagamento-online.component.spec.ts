import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoOnlineComponent } from './pagamento-online.component';

describe('PagamentoOnlineComponent', () => {
  let component: PagamentoOnlineComponent;
  let fixture: ComponentFixture<PagamentoOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentoOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
