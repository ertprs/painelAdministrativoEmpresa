import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarMotoboyComponent } from './selecionar-motoboy.component';

describe('SelecionarMotoboyComponent', () => {
  let component: SelecionarMotoboyComponent;
  let fixture: ComponentFixture<SelecionarMotoboyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionarMotoboyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarMotoboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
