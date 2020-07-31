import { TestBed } from '@angular/core/testing';

import { ConfigServicoService } from './config-servico.service';

describe('ConfigServicoService', () => {
  let service: ConfigServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
