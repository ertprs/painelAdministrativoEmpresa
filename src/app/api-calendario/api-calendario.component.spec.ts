import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCalendarioComponent } from './api-calendario.component';

describe('ApiCalendarioComponent', () => {
  let component: ApiCalendarioComponent;
  let fixture: ComponentFixture<ApiCalendarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCalendarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
