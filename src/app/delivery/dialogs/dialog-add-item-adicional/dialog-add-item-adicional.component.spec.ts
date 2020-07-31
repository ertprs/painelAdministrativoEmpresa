import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddItemAdicionalComponent } from './dialog-add-item-adicional.component';

describe('DialogAddItemAdicionalComponent', () => {
  let component: DialogAddItemAdicionalComponent;
  let fixture: ComponentFixture<DialogAddItemAdicionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddItemAdicionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddItemAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
