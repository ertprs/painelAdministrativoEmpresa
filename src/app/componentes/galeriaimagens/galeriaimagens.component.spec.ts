import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaimagensComponent } from './galeriaimagens.component';

describe('GaleriaimagensComponent', () => {
  let component: GaleriaimagensComponent;
  let fixture: ComponentFixture<GaleriaimagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaimagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaimagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
