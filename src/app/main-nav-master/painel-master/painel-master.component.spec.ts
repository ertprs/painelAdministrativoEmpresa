import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelMasterComponent } from './painel-master.component';

describe('PainelMasterComponent', () => {
  let component: PainelMasterComponent;
  let fixture: ComponentFixture<PainelMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
