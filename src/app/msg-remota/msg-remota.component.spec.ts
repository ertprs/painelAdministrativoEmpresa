import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgRemotaComponent } from './msg-remota.component';

describe('MsgRemotaComponent', () => {
  let component: MsgRemotaComponent;
  let fixture: ComponentFixture<MsgRemotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgRemotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgRemotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
