import { TestBed } from '@angular/core/testing';

import { ProgressSistemaService } from './progress-sistema.service';

describe('ProgressSistemaService', () => {
  let service: ProgressSistemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressSistemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
