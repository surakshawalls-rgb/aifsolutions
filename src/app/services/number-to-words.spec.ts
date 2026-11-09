import { TestBed } from '@angular/core/testing';

import { NumberToWords } from './number-to-words';

describe('NumberToWords', () => {
  let service: NumberToWords;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberToWords);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
