import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadesSistemaComponent } from './cidades-sistema.component';

describe('CidadesSistemaComponent', () => {
  let component: CidadesSistemaComponent;
  let fixture: ComponentFixture<CidadesSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CidadesSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadesSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
