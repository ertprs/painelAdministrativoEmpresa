import { TestBed } from '@angular/core/testing';

import { CategoriaAdicionalService } from './categoria-adicional.service';

describe('CategoriaAdicionalService', () => {
  let service: CategoriaAdicionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaAdicionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
