import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSistemaComponent } from './progress-sistema.component';

describe('ProgressSistemaComponent', () => {
  let component: ProgressSistemaComponent;
  let fixture: ComponentFixture<ProgressSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
