import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  ApiModule,
  CityApiService,
  ESortingType,
  FavoriteApiService,
  HotelApiService,
  IFavoriteResponse
} from '@api';
import {
  ICity,
  IHotel,
  IList
} from '@interfaces';

import { HotelService } from './hotel.service';
import { CityService } from '../city';


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


const hotelId = `023dda52-f07b-47ef-a44c-2301f8743149`;

const hotel: IHotel = {
  id: hotelId,
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
    id: `023dda52-f07b-47ef-a44c-2301f8743149`,
    title: `Amsterdam`,
    location: {
      id: `0b88066e-c543-451f-b4a0-67c0729335da`,
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 8,
    },
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

const favorite: IFavoriteResponse = {
  hotelId,
  userId: `0b88066e-c543-451f-b4a0-67c0729335da`,
  value: true,
};

const hotelList: IHotel[] = [
  {...hotel, isFavorite: false},
  hotel,
  {...hotel, isFavorite: true},
];

describe(`HotelService`, () => {
  let service: HotelService;
  let hotelApiService: HotelApiService;
  let favoriteApiService: FavoriteApiService;
  let cityService: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [
        {
          provide: HotelApiService,
          useValue: {
            loadList: () => of([Object.assign({}, hotel)]),
            loadItemById: () => of(hotel),
          },
        },
        {
          provide: FavoriteApiService,
          useValue: {
            toggleFavoriteStatus: () => of(favorite),
          },
        },
        {
          provide: CityApiService,
          useValue: {
            loadList: () => of(),
          }
        }
      ],
    });
    service = TestBed.inject(HotelService);
    hotelApiService = TestBed.inject(HotelApiService);
    favoriteApiService = TestBed.inject(FavoriteApiService);
    cityService = TestBed.inject(CityService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`removeNotFavoriteHotelsFromFavoriteList should delete all isn't favorite hotels from favoriteHotelList`, () => {
    spyOn(hotelApiService, `loadList`).and.returnValue(of(hotelList));
    service.loadFavoriteHotels();
    let favoriteList: IHotel[];
    service.favoriteHotelList$.subscribe((emittedFavoriteList: IHotel[]) => {
      favoriteList = emittedFavoriteList;
    });
    expect(favoriteList).toEqual(hotelList);
    service.removeNotFavoriteHotelsFromFavoriteList();
    expect(favoriteList).toEqual([{...hotel, isFavorite: true}]);
  });


  describe(`updateList`, () => {
    it(`should call loadList of HotelApiService if haven't hotel list for current sorting, city and pack`, () => {
      const loadList = spyOn(hotelApiService, `loadList`).and.callThrough();
      service.updateList(cityList[0], ESortingType.POPULAR);
      service.updateList(cityList[0], ESortingType.RATING);
      service.updateList(cityList[1], ESortingType.RATING);
      expect(loadList).toHaveBeenCalledTimes(3);
    });

    it(`shouldn't call loadList of HotelApiService if has hotel list for current sorting, city and pack`, () => {
      const loadList = spyOn(hotelApiService, `loadList`).and.callThrough();
      service.updateList(cityList[0], ESortingType.POPULAR);
      service.updateList(cityList[0], ESortingType.POPULAR);
      service.updateList(cityList[0], ESortingType.POPULAR);
      expect(loadList).toHaveBeenCalledTimes(1);
    });

    it(`should emit hotelList`, () => {
      let newHotelList: IHotel[] = [];
      service.hotelParams$.subscribe((hotelParams: IList<IHotel>) => {
        newHotelList = hotelParams.list;
      });
      service.updateList(cityList[0], ESortingType.POPULAR);
      expect(newHotelList).toEqual([hotel]);
    });

    it(`should call loadList of HotelApiService with correct params`, () => {
      const loadList = spyOn(hotelApiService, `loadList`).and.callThrough();
      service.updateList(cityList[0], ESortingType.POPULAR);
      expect(loadList).toHaveBeenCalledWith({
        cityId: cityList[0].id,
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

  describe(`loadFavoriteHotels`, () => {
    it(`should call loadList of HotelApiService`, () => {
      const loadList = spyOn(hotelApiService, `loadList`).and.callThrough();
      service.loadFavoriteHotels();
      expect(loadList).toHaveBeenCalledTimes(1);
    });

    it(`should call loadList of HotelApiService with params`, () => {
      const loadList = spyOn(hotelApiService, `loadList`).and.callThrough();
      service.loadFavoriteHotels();
      expect(loadList).toHaveBeenCalledWith({
        isFavorite: true,
      });
    });

    it(`should emit favorite hotel list`, () => {
      let newFavoriteHotelList: IHotel[] = [];
      service.favoriteHotelList$.subscribe((favoriteHotelList: IHotel[]) => {
        newFavoriteHotelList = favoriteHotelList;
      });
      service.loadFavoriteHotels();
      expect(newFavoriteHotelList).toEqual([hotel]);
    });
  });

  describe(`toggleFavoriteStatus`, () => {
    it(`should call toggleFavoriteStatus method of FavoriteApiService`, () => {
      const toggleFavoriteStatus = spyOn(favoriteApiService, `toggleFavoriteStatus`).and.callThrough();
      service.toggleFavoriteStatus(hotelId);
      expect(toggleFavoriteStatus).toHaveBeenCalledTimes(1);
    });

    it(`should toggle favorite status in all contained hotel maps`, () => {
      let newHotelList: IHotel[] = [];
      service.hotelParams$.subscribe((hotelParams: IList<IHotel>) => {
        newHotelList = hotelParams.list;
      });
      cityService.switchCity(cityList[0].id);
      service.updateList(cityList[0], ESortingType.POPULAR);
      expect(newHotelList[0].isFavorite).toBeFalsy();
      cityService.switchCity(cityList[1].id);
      service.updateList(cityList[1], ESortingType.LOW_PRICE);
      expect(newHotelList[0].isFavorite).toBeFalsy();

      service.toggleFavoriteStatus(hotelId);

      service.updateList(cityList[0], ESortingType.POPULAR);
      expect(newHotelList[0].isFavorite).toBeTruthy();
      service.updateList(cityList[1], ESortingType.LOW_PRICE);
      expect(newHotelList[0].isFavorite).toBeTruthy();
    });
  });
});
