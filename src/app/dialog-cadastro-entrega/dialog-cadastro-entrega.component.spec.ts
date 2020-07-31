import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCadastroEntregaComponent } from './dialog-cadastro-entrega.component';

describe('DialogCadastroEntregaComponent', () => {
  let component: DialogCadastroEntregaComponent;
  let fixture: ComponentFixture<DialogCadastroEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCadastroEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCadastroEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
