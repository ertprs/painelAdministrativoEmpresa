import { TestBed } from '@angular/core/testing';

import { UploadimagemService } from './uploadimagem.service';

describe('UploadimagemService', () => {
  let service: UploadimagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadimagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
