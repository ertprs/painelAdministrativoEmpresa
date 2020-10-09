import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenhaOperadorDesfazerComponent } from './senha-operador-desfazer.component';

describe('SenhaOperadorDesfazerComponent', () => {
  let component: SenhaOperadorDesfazerComponent;
  let fixture: ComponentFixture<SenhaOperadorDesfazerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenhaOperadorDesfazerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenhaOperadorDesfazerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
