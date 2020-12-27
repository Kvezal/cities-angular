import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiModule, CityApiService } from '@api';
import { ICity } from '@interfaces';

import { CityService } from './city.service';


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

describe('CityService', () => {
  let service: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [
        {
          provide: CityApiService,
          useValue: {
            loadList: () => of([city])
          }
        }
      ]
    });
    service = TestBed.inject(CityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should get city list when service init`, () => {
    let cityList = [];
    service.cityList$.subscribe((newCityList: ICity[]) => {
      cityList = newCityList;
    });
    expect(cityList).toEqual([city]);
  });
});
