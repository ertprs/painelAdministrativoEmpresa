import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCategoriaDestaqueComponent } from './form-categoria-destaque.component';

describe('FormCategoriaDestaqueComponent', () => {
  let component: FormCategoriaDestaqueComponent;
  let fixture: ComponentFixture<FormCategoriaDestaqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCategoriaDestaqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCategoriaDestaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
