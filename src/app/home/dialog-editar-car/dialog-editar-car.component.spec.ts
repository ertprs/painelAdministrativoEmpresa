import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarCarComponent } from './dialog-editar-car.component';

describe('DialogEditarCarComponent', () => {
  let component: DialogEditarCarComponent;
  let fixture: ComponentFixture<DialogEditarCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditarCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
