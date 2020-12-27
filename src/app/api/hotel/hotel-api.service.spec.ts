import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { IHotel } from '@interfaces';

import { ApiService } from '../api.service';
import { ApiPath } from '../api-path.enum';
import { IApiOptions } from '../interfaces';
import { HotelApiService } from './hotel-api.service';
import { ESortingType } from './hotel.interface';
import { ApiModule } from '../api.module';


const hotel: IHotel = {
  id: `7afc47be-b007-4fd1-b4c8-1ac18b7bb138`,
  title: `Tile House`,
  description: `A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.`,
  bedroomCount: 2,
  maxAdultCount: 2,
  price: 1586,
  isPremium: true,
  rating: 3.5,
  features: [`Washing machine`, `Baby seat`, `Towels`, `Dishwasher`, `Cable TV`],
  type: `apartment`,
  city: {
    id: `fc5ff280-09a1-4b5e-af32-3428197a7932`,
    title: `Paris`,
    location: {
      id: `8c5c908d-3fc7-4a4e-af0b-57cc948898f0`,
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    }
  },
  location: {
    id: `94d71df9-57e4-4862-b73c-5835130d0210`,
    latitude: 48.85457,
    longitude: 2.34769,
    zoom: 10,
  },
  host: {
    id: `048690f4-880a-4bee-ab0a-5f225b8df65e`,
    name: `gke02u3yt`,
    image: `images/avatars/3.jpg`,
    type: `pro`,
  },
  images: [`images/hotels/10.jpg`],
  isFavorite: false,
};

const hotelQueryParams = {
  cityId: `023dda52-f07b-47ef-a44c-2301f8743149`,
  hotelId: `023dda52-f07b-47ef-a44c-2301f8743149`,
  sorting: ESortingType.POPULAR,
  isFavorite: true,
};

describe(`HotelApiService`, () => {
  let service: HotelApiService;
  let apiService: ApiService;
  const basePath = ApiPath.HOTEL;
  const hotelId = `hotel-id`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [
        {
          provide: ApiService,
          useValue: {
            get: () => of(hotel),
          },
        }
      ]
    });
    service = TestBed.inject(HotelApiService);
    apiService = TestBed.inject(ApiService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  describe(`loadItemById`, () => {
    beforeEach(() => {
      spyOn(apiService, `get`);
      service.loadItemById(hotelId);
    });

    it(`should call get method of ApiService`, () => {
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it(`should call get method with params`, () => {
      expect(apiService.get).toHaveBeenCalledWith(`${basePath}/${hotelId}`);
    });
  });

  describe(`loadList`, () => {
    beforeEach(() => {
      spyOn(apiService, `get`);
    });

    it(`should call get method of ApiService`, () => {
      service.loadList();
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it(`should call get method with path`, () => {
      service.loadList();
      expect(apiService.get).toHaveBeenCalledWith(basePath, {queries: {}});
    });

    it(`should call get method with path and options`, () => {
      service.loadList(hotelQueryParams);
      expect(apiService.get).toHaveBeenCalledWith(basePath, {
        queries: hotelQueryParams,
      });
    });
  });
});
