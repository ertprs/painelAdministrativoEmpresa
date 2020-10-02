import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarBancoComponent } from './selecionar-banco.component';

describe('SelecionarBancoComponent', () => {
  let component: SelecionarBancoComponent;
  let fixture: ComponentFixture<SelecionarBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionarBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
