import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDinamComponent } from './dialog-dinam.component';

describe('DialogDinamComponent', () => {
  let component: DialogDinamComponent;
  let fixture: ComponentFixture<DialogDinamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDinamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDinamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
