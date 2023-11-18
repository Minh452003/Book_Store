import { TestBed } from '@angular/core/testing';

import { StatiscalService } from './statiscal.service';

describe('StatiscalService', () => {
  let service: StatiscalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatiscalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
