import { TestBed } from '@angular/core/testing';

import { DialogCadastroCategoriaAdcService } from './dialog-cadastro-categoria-adc.service';

describe('DialogCadastroCategoriaAdcService', () => {
  let service: DialogCadastroCategoriaAdcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogCadastroCategoriaAdcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
