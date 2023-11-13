import { TestBed } from '@angular/core/testing';

import { RosterBuilderService } from './roster-builder.service';

describe('RosterBuilderService', () => {
  let service: RosterBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RosterBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
