import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MototboysComponent } from './mototboys.component';

describe('MototboysComponent', () => {
  let component: MototboysComponent;
  let fixture: ComponentFixture<MototboysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MototboysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MototboysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
