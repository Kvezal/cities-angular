import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ICity } from '@interfaces';

import { ApiModule } from '../api.module';
import { ApiService } from '../api.service';
import { ApiPath } from '../api-path.enum';
import { CityApiService } from './city-api.service';


const city: ICity = {
  id: `023dda52-f07b-47ef-a44c-2301f8743149`,
  title: `Amsterdam`,
  location: {
    id: `0b88066e-c543-451f-b4a0-67c0729335da`,
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 8,
  },
};

describe(`CityApiService`, () => {
  let service: CityApiService;
  let apiService: ApiService;
  const basePath = ApiPath.CITY;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [
        {
          provide: ApiService,
          useValue: {
            get: () => null,
          },
        }
      ]
    });
    service = TestBed.inject(CityApiService);
    apiService = TestBed.inject(ApiService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  describe(`loadList`, () => {
    beforeEach(() => {
      spyOn(apiService, `get`).and.returnValue(of([city]));
      service.loadList();
    });

    it(`should call get method of ApiService`, () => {
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it(`should call get method with params`, () => {
      expect(apiService.get).toHaveBeenCalledWith(basePath);
    });
  });
});
