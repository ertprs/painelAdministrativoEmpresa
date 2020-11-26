import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavMasterComponent } from './main-nav-master.component';

describe('MainNavMasterComponent', () => {
  let component: MainNavMasterComponent;
  let fixture: ComponentFixture<MainNavMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNavMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
