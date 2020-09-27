import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBancoComponent } from './form-banco.component';

describe('FormBancoComponent', () => {
  let component: FormBancoComponent;
  let fixture: ComponentFixture<FormBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
