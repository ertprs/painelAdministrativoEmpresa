import { TestBed } from '@angular/core/testing';

import { GuardaAtenticacaoService } from './guarda-atenticacao.service';

describe('GuardaAtenticacaoService', () => {
  let service: GuardaAtenticacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardaAtenticacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
