import { TestBed } from '@angular/core/testing';

import { FavoritePageService } from './favorite-page.service';

describe(`FavoritePageService`, () => {
  let service: FavoritePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritePageService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });
});
