import { TestBed } from '@angular/core/testing';

import { ChatservicoService } from './chatservico.service';

describe('ChatservicoService', () => {
  let service: ChatservicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatservicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
