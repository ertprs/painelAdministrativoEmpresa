import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBairroComponent } from './form-bairro.component';

describe('FormBairroComponent', () => {
  let component: FormBairroComponent;
  let fixture: ComponentFixture<FormBairroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBairroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBairroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
