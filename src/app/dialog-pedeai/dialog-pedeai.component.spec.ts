import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPedeaiComponent } from './dialog-pedeai.component';

describe('DialogPedeaiComponent', () => {
  let component: DialogPedeaiComponent;
  let fixture: ComponentFixture<DialogPedeaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPedeaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPedeaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
