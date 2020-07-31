import { TestBed } from '@angular/core/testing';

import { ServicoEntregaService } from './servico-entrega.service';

describe('ServicoEntregaService', () => {
  let service: ServicoEntregaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoEntregaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
