import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerImagemComponent } from './ver-imagem.component';

describe('VerImagemComponent', () => {
  let component: VerImagemComponent;
  let fixture: ComponentFixture<VerImagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerImagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
