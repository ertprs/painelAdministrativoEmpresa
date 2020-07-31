import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMototboyComponent } from './dialog-add-mototboy.component';

describe('DialogAddMototboyComponent', () => {
  let component: DialogAddMototboyComponent;
  let fixture: ComponentFixture<DialogAddMototboyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddMototboyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddMototboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
