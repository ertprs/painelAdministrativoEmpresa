import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferirEstoqueMotoboyComponent } from './transferir-estoque-motoboy.component';

describe('TransferirEstoqueMotoboyComponent', () => {
  let component: TransferirEstoqueMotoboyComponent;
  let fixture: ComponentFixture<TransferirEstoqueMotoboyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferirEstoqueMotoboyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferirEstoqueMotoboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
