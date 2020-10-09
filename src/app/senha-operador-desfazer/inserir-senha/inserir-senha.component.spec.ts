import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirSenhaComponent } from './inserir-senha.component';

describe('InserirSenhaComponent', () => {
  let component: InserirSenhaComponent;
  let fixture: ComponentFixture<InserirSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InserirSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
