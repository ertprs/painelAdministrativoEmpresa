import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCadastroClienteComponent } from './dialog-cadastro-cliente.component';

describe('DialogCadastroClienteComponent', () => {
  let component: DialogCadastroClienteComponent;
  let fixture: ComponentFixture<DialogCadastroClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCadastroClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCadastroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
