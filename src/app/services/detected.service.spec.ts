import { TestBed } from '@angular/core/testing';

import { DetectedService } from './detected.service';

describe('DetectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetectedService = TestBed.get(DetectedService);
    expect(service).toBeTruthy();
  });
});
