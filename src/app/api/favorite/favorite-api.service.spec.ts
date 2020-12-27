import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiModule } from '../api.module';
import { ApiPath } from '../api-path.enum';
import { ApiService } from '../api.service';
import { FavoriteApiService } from './favorite-api.service';
import { IFavoriteResponse } from './favorite-api.interface';


const hotelId = `023dda52-f07b-47ef-a44c-2301f8743149`;

const favorite: IFavoriteResponse = {
  hotelId,
  userId: `0b88066e-c543-451f-b4a0-67c0729335da`,
  value: true,
};


describe(`FavoriteApiService`, () => {
  let service: FavoriteApiService;
  let apiService: ApiService;
  const basePath = ApiPath.FAVORITE;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [
        {
          provide: ApiService,
          useValue: {
            post: () => of(favorite),
          },
        },
      ],
    });
    service = TestBed.inject(FavoriteApiService);
    apiService = TestBed.inject(ApiService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  describe(`toggleFavoriteStatus`, () => {
    beforeEach(() => {
      spyOn(apiService, `post`).and.returnValue(of());
      service.toggleFavoriteStatus(hotelId);
    });

    it(`should call get method of ApiService`, () => {
      expect(apiService.post).toHaveBeenCalledTimes(1);
    });

    it(`should call get method with params`, () => {
      expect(apiService.post).toHaveBeenCalledWith(basePath, {
        queries: {
          hotelId,
        },
      });
    });
  });
});
