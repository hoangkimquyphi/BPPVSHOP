import { TestBed } from '@angular/core/testing';

import { CardtService } from './cardt.service';

describe('CardtService', () => {
  let service: CardtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
