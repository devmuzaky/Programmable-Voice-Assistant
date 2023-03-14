import { TestBed } from '@angular/core/testing';

import { RasaSocketService } from './rasa-socket.service';

describe('SocketService', () => {
  let service: RasaSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RasaSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
