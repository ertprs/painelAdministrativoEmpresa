import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarItemComponent } from './dialog-editar-item.component';

describe('DialogEditarItemComponent', () => {
  let component: DialogEditarItemComponent;
  let fixture: ComponentFixture<DialogEditarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
