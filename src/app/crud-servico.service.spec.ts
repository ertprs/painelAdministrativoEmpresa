import { TestBed } from '@angular/core/testing';

import { CrudServicoService } from './crud-servico.service';

describe('CrudServicoService', () => {
  let service: CrudServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
