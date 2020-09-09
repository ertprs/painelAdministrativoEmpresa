import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BairrosSistemaComponent } from './bairros-sistema.component';

describe('BairrosSistemaComponent', () => {
  let component: BairrosSistemaComponent;
  let fixture: ComponentFixture<BairrosSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BairrosSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BairrosSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
