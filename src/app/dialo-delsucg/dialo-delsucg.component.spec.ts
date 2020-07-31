import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoDelsucgComponent } from './dialo-delsucg.component';

describe('DialoDelsucgComponent', () => {
  let component: DialoDelsucgComponent;
  let fixture: ComponentFixture<DialoDelsucgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialoDelsucgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoDelsucgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
