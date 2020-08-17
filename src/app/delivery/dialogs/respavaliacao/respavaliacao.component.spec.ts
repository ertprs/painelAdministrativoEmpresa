import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespavaliacaoComponent } from './respavaliacao.component';

describe('RespavaliacaoComponent', () => {
  let component: RespavaliacaoComponent;
  let fixture: ComponentFixture<RespavaliacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespavaliacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespavaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
