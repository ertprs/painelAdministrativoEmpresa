import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderDelsucComponent } from './loader-delsuc.component';

describe('LoaderDelsucComponent', () => {
  let component: LoaderDelsucComponent;
  let fixture: ComponentFixture<LoaderDelsucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderDelsucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderDelsucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
