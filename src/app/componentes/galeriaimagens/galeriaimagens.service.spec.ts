import { TestBed } from '@angular/core/testing';

import { GaleriaimagensService } from './galeriaimagens.service';

describe('GaleriaimagensService', () => {
  let service: GaleriaimagensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaleriaimagensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
