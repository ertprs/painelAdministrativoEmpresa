import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleFiadoComponent } from './controle-fiado.component';

describe('ControleFiadoComponent', () => {
  let component: ControleFiadoComponent;
  let fixture: ComponentFixture<ControleFiadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleFiadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleFiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
