import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCategoriaAdicionalComponent } from './dialog-categoria-adicional.component';

describe('DialogCategoriaAdicionalComponent', () => {
  let component: DialogCategoriaAdicionalComponent;
  let fixture: ComponentFixture<DialogCategoriaAdicionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCategoriaAdicionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCategoriaAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
