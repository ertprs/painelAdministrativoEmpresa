import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDefaultComponent } from './pagina-default.component';

describe('PaginaDefaultComponent', () => {
  let component: PaginaDefaultComponent;
  let fixture: ComponentFixture<PaginaDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
