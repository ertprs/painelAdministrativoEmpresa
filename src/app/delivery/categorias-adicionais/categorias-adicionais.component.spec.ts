import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasAdicionaisComponent } from './categorias-adicionais.component';

describe('CategoriasAdicionaisComponent', () => {
  let component: CategoriasAdicionaisComponent;
  let fixture: ComponentFixture<CategoriasAdicionaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasAdicionaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasAdicionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
