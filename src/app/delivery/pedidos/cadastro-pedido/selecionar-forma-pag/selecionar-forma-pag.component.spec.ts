import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarFormaPagComponent } from './selecionar-forma-pag.component';

describe('SelecionarFormaPagComponent', () => {
  let component: SelecionarFormaPagComponent;
  let fixture: ComponentFixture<SelecionarFormaPagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionarFormaPagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarFormaPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
