import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDoisComponent } from './tela-dois.component';

describe('TelaDoisComponent', () => {
  let component: TelaDoisComponent;
  let fixture: ComponentFixture<TelaDoisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaDoisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaDoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
