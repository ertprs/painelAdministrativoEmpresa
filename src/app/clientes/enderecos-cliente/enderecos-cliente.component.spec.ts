import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecosClienteComponent } from './enderecos-cliente.component';

describe('EnderecosClienteComponent', () => {
  let component: EnderecosClienteComponent;
  let fixture: ComponentFixture<EnderecosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnderecosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
