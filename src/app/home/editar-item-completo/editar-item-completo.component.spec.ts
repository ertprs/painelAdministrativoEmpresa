import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarItemCompletoComponent } from './editar-item-completo.component';

describe('EditarItemCompletoComponent', () => {
  let component: EditarItemCompletoComponent;
  let fixture: ComponentFixture<EditarItemCompletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarItemCompletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarItemCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
