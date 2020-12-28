import { TestBed } from '@angular/core/testing';

import { CityPageService } from './city-page.service';

describe(`CityPageService`, () => {
  let service: CityPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityPageService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });
});
