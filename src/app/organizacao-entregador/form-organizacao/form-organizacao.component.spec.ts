import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrganizacaoComponent } from './form-organizacao.component';

describe('FormOrganizacaoComponent', () => {
  let component: FormOrganizacaoComponent;
  let fixture: ComponentFixture<FormOrganizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOrganizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOrganizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
