import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensAdicionaisComponent } from './itens-adicionais.component';

describe('ItensAdicionaisComponent', () => {
  let component: ItensAdicionaisComponent;
  let fixture: ComponentFixture<ItensAdicionaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensAdicionaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensAdicionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
