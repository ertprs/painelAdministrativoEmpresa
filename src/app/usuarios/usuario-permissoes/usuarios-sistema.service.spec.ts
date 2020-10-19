import { TestBed } from '@angular/core/testing';

import { UsuariosSistemaService } from './usuarios-sistema.service';

describe('UsuariosSistemaService', () => {
  let service: UsuariosSistemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosSistemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
