import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissaoEntregasComponent } from './comissao-entregas.component';

describe('ComissaoEntregasComponent', () => {
  let component: ComissaoEntregasComponent;
  let fixture: ComponentFixture<ComissaoEntregasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissaoEntregasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissaoEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
