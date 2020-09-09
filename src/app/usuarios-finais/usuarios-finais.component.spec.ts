import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosFinaisComponent } from './usuarios-finais.component';

describe('UsuariosFinaisComponent', () => {
  let component: UsuariosFinaisComponent;
  let fixture: ComponentFixture<UsuariosFinaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosFinaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosFinaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
