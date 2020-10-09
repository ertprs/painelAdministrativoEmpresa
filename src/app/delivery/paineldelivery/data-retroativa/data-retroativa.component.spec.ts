import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRetroativaComponent } from './data-retroativa.component';

describe('DataRetroativaComponent', () => {
  let component: DataRetroativaComponent;
  let fixture: ComponentFixture<DataRetroativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataRetroativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRetroativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
