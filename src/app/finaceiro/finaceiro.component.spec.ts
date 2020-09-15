import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaceiroComponent } from './finaceiro.component';

describe('FinaceiroComponent', () => {
  let component: FinaceiroComponent;
  let fixture: ComponentFixture<FinaceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinaceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinaceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
