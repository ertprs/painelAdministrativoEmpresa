import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSiteComponent } from './inicio-site.component';

describe('InicioSiteComponent', () => {
  let component: InicioSiteComponent;
  let fixture: ComponentFixture<InicioSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
