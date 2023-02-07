import { TestBed } from '@angular/core/testing';

import { SttService } from './stt.service';

describe('SttService', () => {
  let service: SttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
