import { TestBed } from '@angular/core/testing';

import { GuardaConfigSistemaService } from './guarda-config-sistema.service';

describe('GuardaConfigSistemaService', () => {
  let service: GuardaConfigSistemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardaConfigSistemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
