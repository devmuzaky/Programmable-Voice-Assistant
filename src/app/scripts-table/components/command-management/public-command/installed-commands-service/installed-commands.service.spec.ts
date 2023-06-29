import { TestBed } from '@angular/core/testing';

import { InstalledCommandsService } from './installed-commands.service';

describe('InstalledCommandsService', () => {
  let service: InstalledCommandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstalledCommandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
