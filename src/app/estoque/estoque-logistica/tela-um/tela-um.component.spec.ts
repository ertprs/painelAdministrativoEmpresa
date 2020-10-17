import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaUmComponent } from './tela-um.component';

describe('TelaUmComponent', () => {
  let component: TelaUmComponent;
  let fixture: ComponentFixture<TelaUmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaUmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaUmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
