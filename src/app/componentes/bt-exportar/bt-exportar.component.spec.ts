import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtExportarComponent } from './bt-exportar.component';

describe('BtExportarComponent', () => {
  let component: BtExportarComponent;
  let fixture: ComponentFixture<BtExportarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtExportarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtExportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
