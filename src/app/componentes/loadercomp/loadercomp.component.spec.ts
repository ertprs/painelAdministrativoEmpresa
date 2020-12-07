import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadercompComponent } from './loadercomp.component';

describe('LoadercompComponent', () => {
  let component: LoadercompComponent;
  let fixture: ComponentFixture<LoadercompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadercompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadercompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
