import { TestBed } from '@angular/core/testing';

import { OfferPageService } from './offer-page.service';

describe(`OfferPageService`, () => {
  let service: OfferPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferPageService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });
});
