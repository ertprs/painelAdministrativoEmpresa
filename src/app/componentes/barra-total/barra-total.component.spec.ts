import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraTotalComponent } from './barra-total.component';

describe('BarraTotalComponent', () => {
  let component: BarraTotalComponent;
  let fixture: ComponentFixture<BarraTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
