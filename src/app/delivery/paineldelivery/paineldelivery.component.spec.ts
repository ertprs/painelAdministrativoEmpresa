import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaineldeliveryComponent } from './paineldelivery.component';

describe('PaineldeliveryComponent', () => {
  let component: PaineldeliveryComponent;
  let fixture: ComponentFixture<PaineldeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaineldeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaineldeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
