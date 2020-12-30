import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiModule, CityApiService } from '@api';
import { ICity } from '@interfaces';

import { CityService } from './city.service';


const cityList: ICity[] = [
  {
    id: `023dda52-f07b-47ef-a44c-2301f8743149`,
    title: `Amsterdam`,
    location: {
      id: `0b88066e-c543-451f-b4a0-67c0729335da`,
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 8,
    },
  },
  {
    id: `a38df743-3355-4c81-ba10-912f7e19edf7`,
    title: `Brussels`,
    location: {
      id: `a5737932-bcf7-4440-ab89-fd3dff68ccea`,
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    },
  },
];

describe(`CityService`, () => {
  let service: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [
        {
          provide: CityApiService,
          useValue: {
            loadList: () => of(cityList)
          }
        }
      ]
    });
    service = TestBed.inject(CityService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`should get city list when service init`, () => {
    let currentCityList = [];
    service.cityList$.subscribe((newCityList: ICity[]) => {
      currentCityList = newCityList;
    });
    expect(currentCityList).toEqual(cityList);
  });

  describe(`switchCity`, () => {
    it(`shouldn't have the first city by default`, () => {
      let city: ICity;
      service.city$.subscribe((newCity: ICity) => {
        city = newCity;
      });
      expect(city).toBe(cityList[0]);
    });

    it(`should switch a city before call switchCity method`, () => {
      let city: ICity;
      service.city$.subscribe((newCity: ICity) => {
        city = newCity;
      });
      service.switchCity(cityList[0].id);
      expect(city).toEqual(cityList[0]);
      service.switchCity(cityList[1].id);
      expect(city).toEqual(cityList[1]);
    });
  });
});
