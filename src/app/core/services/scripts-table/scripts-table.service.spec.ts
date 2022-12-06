import { TestBed } from '@angular/core/testing';

import { ScriptsTableService } from './scripts-table.service';

describe('ScriptTableService', () => {
  let service: ScriptsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
