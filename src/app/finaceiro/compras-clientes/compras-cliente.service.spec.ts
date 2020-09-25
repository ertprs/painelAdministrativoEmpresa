import { TestBed } from '@angular/core/testing';

import { ComprasClienteService } from './compras-cliente.service';

describe('ComprasClienteService', () => {
  let service: ComprasClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprasClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
