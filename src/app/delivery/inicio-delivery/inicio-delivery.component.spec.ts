import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioDeliveryComponent } from './inicio-delivery.component';

describe('InicioDeliveryComponent', () => {
  let component: InicioDeliveryComponent;
  let fixture: ComponentFixture<InicioDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
