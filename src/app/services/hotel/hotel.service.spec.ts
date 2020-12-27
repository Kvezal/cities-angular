import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  ApiModule,
  ESortingType,
  HotelApiService
} from '@api';
import { IHotel } from '@interfaces';

import { HotelService } from './hotel.service';


const cityId = `067564fe-3fce-4e11-add6-7ed402979819`;

const hotel: IHotel = {
  id: `240d821a-b2e5-437f-afb9-7e840eafba81`,
  title: `The Joshua Tree House`,
  description: `A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.`,
  bedroomCount: 3,
  maxAdultCount: 8,
  price: 326,
  isPremium: false,
  rating: 3.04,
  features: [
    `Coffee machine`,
    `Towels`,
    `Washing machine`
  ],
  type: `house`,
  city: {
    id: cityId,
    title: `Hamburg`,
    location: {
      id: `56d78420-03b3-4f1d-b86f-387e00968f8c`,
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  location: {
    id: `20fbab8c-1766-4cd5-bf9e-e059bd9ccbe7`,
    latitude: 53.55144,
    longitude: 10.00077,
    zoom: 10
  },
  host: {
    id: `fc1086f7-ef70-42cf-886d-c215c96e3962`,
    name: `3efxzdbrr3`,
    image: `images/avatars/8.jpg`,
    type: `pro`
  },
  images: [
    `images/hotels/19.jpg`
  ],
  isFavorite: false
};

describe('HotelService', () => {
  let service: HotelService;
  let hotelApiService: HotelApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [
        {
          provide: HotelApiService,
          useValue: {
            loadList: () => of([hotel]),
            loadItemById: () => of(hotel),
          }
        }
      ],
    });
    service = TestBed.inject(HotelService);
    hotelApiService = TestBed.inject(HotelApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`updateList`, () => {
    it(`should call loadList of HotelApiService if haven't hotel list for current sorting, city and pack`, () => {
      const loadList = spyOn(hotelApiService, `loadList`).and.callThrough();
      service.updateList(cityId, ESortingType.POPULAR);
      service.updateList(cityId, ESortingType.RATING);
      service.updateList(`0750092a-061b-463e-a262-3f77146aec66`, ESortingType.RATING);
      expect(loadList).toHaveBeenCalledTimes(3);
    });

    it(`shouldn't call loadList of HotelApiService if has hotel list for current sorting, city and pack`, () => {
      const loadList = spyOn(hotelApiService, `loadList`).and.callThrough();
      service.updateList(cityId, ESortingType.POPULAR);
      service.updateList(cityId, ESortingType.POPULAR);
      service.updateList(cityId, ESortingType.POPULAR);
      expect(loadList).toHaveBeenCalledTimes(1);
    });

    it(`should emit hotelList`, () => {
      let hotelList: IHotel[] = [];
      service.hotelList$.subscribe((newHotelList: IHotel[]) => {
        hotelList = newHotelList;
      });
      service.updateList(cityId, ESortingType.POPULAR);
      expect(hotelList).toEqual([hotel]);
    });

    it(`should call loadList of HotelApiService with correct params`, () => {
      const loadList = spyOn(hotelApiService, `loadList`).and.callThrough();
      service.updateList(cityId, ESortingType.POPULAR);
      expect(loadList).toHaveBeenCalledWith({
        cityId,
        sorting: ESortingType.POPULAR,
      });
    });

    it(`should emit popular sorting by default`, () => {
      let sorting: ESortingType = ESortingType.NEARBY;
      service.sorting$.subscribe((newSorting: ESortingType) => {
        sorting = newSorting;
      });
      expect(sorting).toEqual(ESortingType.POPULAR);
    });

    it(`should emit sorting`, () => {
      let sorting: ESortingType = ESortingType.POPULAR;
      service.sorting$.subscribe((newSorting: ESortingType) => {
        sorting = newSorting;
      });
      [ESortingType.RATING, ESortingType.POPULAR, ESortingType.HIGH_PRICE, ESortingType.LOW_PRICE]
        .forEach((emittedSorting: ESortingType) => {
          service.updateList(cityId, emittedSorting);
          expect(sorting).toEqual(emittedSorting);
        });
    });
  });

  describe(`loadHotel`, () => {
    it(`should call loadItemById of HotelApiService`, () => {
      const loadItemById = spyOn(hotelApiService, `loadItemById`).and.callThrough();
      service.loadHotel(hotel.id);
      expect(loadItemById).toHaveBeenCalledTimes(1);
    });

    it(`should return observable which return hotel item`, () => {
      let hotelResult: IHotel;
      service.loadHotel(hotel.id).subscribe((newHotel: IHotel) => {
        hotelResult = newHotel;
      });
      expect(hotelResult).toEqual(hotel);
    });

    it(`should call loadItemById with params`, () => {
      const loadItemById = spyOn(hotelApiService, `loadItemById`).and.callThrough();
      service.loadHotel(hotel.id);
      expect(loadItemById).toHaveBeenCalledWith(hotel.id);
    });
  });

  describe(`loadNearestHotels`, () => {
    it(`should call loadList of HotelApiService`, () => {
      const loadList = spyOn(hotelApiService, `loadList`).and.callThrough();
      service.loadNearestHotels(hotel.id);
      expect(loadList).toHaveBeenCalledTimes(1);
    });

    it(`should call loadList of HotelApiService with correct params`, () => {
      const loadList = spyOn(hotelApiService, `loadList`).and.callThrough();
      service.loadNearestHotels(hotel.id);
      expect(loadList).toHaveBeenCalledWith({
        hotelId: hotel.id,
        sorting: ESortingType.NEARBY,
      });
    });
  });
});
