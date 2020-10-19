import { TestBed } from '@angular/core/testing';

import { UsuariosAdmService } from './usuarios-adm.service';

describe('UsuariosAdmService', () => {
  let service: UsuariosAdmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosAdmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
