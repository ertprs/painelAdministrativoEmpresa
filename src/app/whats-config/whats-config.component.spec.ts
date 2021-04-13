import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsConfigComponent } from './whats-config.component';

describe('WhatsConfigComponent', () => {
  let component: WhatsConfigComponent;
  let fixture: ComponentFixture<WhatsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
