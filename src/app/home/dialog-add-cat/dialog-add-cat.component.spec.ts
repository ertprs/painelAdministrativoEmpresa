import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCatComponent } from './dialog-add-cat.component';

describe('DialogAddCatComponent', () => {
  let component: DialogAddCatComponent;
  let fixture: ComponentFixture<DialogAddCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
