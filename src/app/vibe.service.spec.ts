import { TestBed } from '@angular/core/testing';

import { VibeService } from './vibe.service';

describe('VibeService', () => {
  let service: VibeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VibeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
