import { TestBed } from '@angular/core/testing';

import { PointageService } from './pointage.service';

describe('PointageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointageService = TestBed.get(PointageService);
    expect(service).toBeTruthy();
  });
});
