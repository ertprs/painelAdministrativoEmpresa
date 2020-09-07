import { TestBed } from '@angular/core/testing';

import { CadastroPedidoService } from './cadastro-pedido.service';

describe('CadastroPedidoService', () => {
  let service: CadastroPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
