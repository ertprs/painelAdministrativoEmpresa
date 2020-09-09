import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacoesSistemaComponent } from './notificacoes-sistema.component';

describe('NotificacoesSistemaComponent', () => {
  let component: NotificacoesSistemaComponent;
  let fixture: ComponentFixture<NotificacoesSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacoesSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacoesSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
