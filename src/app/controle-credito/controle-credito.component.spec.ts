import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleCreditoComponent } from './controle-credito.component';

describe('ControleCreditoComponent', () => {
  let component: ControleCreditoComponent;
  let fixture: ComponentFixture<ControleCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
