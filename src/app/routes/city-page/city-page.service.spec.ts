import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  AuthService,
  CityService,
  HotelService
} from '@services';
import { CityPageService } from './city-page.service';
import {
  ICity,
  IHotel,
  IList
} from '@interfaces';
import {
  IMapCity,
  IMapMarker,
  IMenuItem
} from '@components';
import {
  ESortingType,
  IUserResponse
} from '@api';


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

const menuList: IMenuItem[] = cityList.map((city) => ({
  id: city.id,
  path: city.title,
  name: city.title,
}));

const mapCityParamsList: IMapCity[] = cityList.map((city) => ({
  coords: {
    lat: cityList[0].location.latitude,
    lng: cityList[0].location.longitude,
  },
  zoom: cityList[0].location.zoom,
}));

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
  images: [`assets/images/test/apartment-03.jpg`],
  isFavorite: false,
};

const HOTEL_COUNT = 6;

const hotelParams: IList<IHotel> = {
  list: Array(HOTEL_COUNT).fill({}).map(() => hotel),
};

const markerList: IMapMarker[] = hotelParams.list.map((newHotel: IHotel) => ({
  id: newHotel.location.id,
  coords: {
    lat: newHotel.location.latitude,
    lng: newHotel.location.longitude,
  },
}));

const user: IUserResponse = {
  id: `023dda52-f07b-47ef-a44c-2301f8743149`,
  name: `kvezal`,
  email: `kvezal@gmail.com`,
  image: `assets/images/test/1.jpg`,
};

describe(`CityPageService`, () => {
  let service: CityPageService;
  let authService: AuthService;
  let cityService: CityService;
  let hotelService: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CityPageService,
        {
          provide: AuthService,
          useValue: {
            user$: of(user),
          }
        },
        {
          provide: CityService,
          useValue: {
            city$: of(cityList[0]),
            cityList$: of(cityList),
            switchCityByName: () => null,
          },
        },
        {
          provide: HotelService,
          useValue: {
            hotelParams$: of(hotelParams),
            sorting$: of(ESortingType.POPULAR),
            changeSorting: () => null,
            toggleFavoriteStatus: () => null,
          },
        },
      ]
    });

    service = TestBed.inject(CityPageService);
    authService = TestBed.inject(AuthService);
    cityService = TestBed.inject(CityService);
    hotelService = TestBed.inject(HotelService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`city$ should emit city`, () => {
    let newCity;
    service.city$.subscribe((emittedCity: ICity) => {
      newCity = emittedCity;
    });
    expect(newCity).toBe(cityList[0]);
  });

  it(`mapCityParams$ should emit map city params when city$ emitted`, () => {
    let newMapCityParams: IMapCity;
    service.mapCityParams$.subscribe((emittedMapCityParams: IMapCity) => {
      newMapCityParams = emittedMapCityParams;
    });
    expect(newMapCityParams).toEqual(mapCityParamsList[0]);
  });

  it(`menuList$ should emit menu item list when cityList$ emitted`, () => {
    let newMenuList;
    service.menuList$.subscribe((emittedMenuList: IMenuItem[]) => {
      newMenuList = emittedMenuList;
    });
    expect(newMenuList).toEqual(menuList);
  });

  it(`hotelParams$ should emit hotel params`, () => {
    let newHotelParams: IList<IHotel>;
    service.hotelParams$.subscribe((emittedHotelParams: IList<IHotel>) => {
      newHotelParams = emittedHotelParams;
    });
    expect(newHotelParams).toEqual(hotelParams);
  });

  it(`mapMarkerList$ should emit map markers when hotelParams$ emitted`, () => {
    let newMapMarkers: IMapMarker[];
    service.mapMarkerList$.subscribe((emittedHotelParams: IMapMarker[]) => {
      newMapMarkers = emittedHotelParams;
    });
    expect(newMapMarkers).toEqual(markerList);
  });

  it(`sorting$ should emit current sorting only ones`, () => {
    hotelService.sorting$ = of(ESortingType.POPULAR, ESortingType.RATING, ESortingType.LOW_PRICE);
    let count = 0;
    service.sorting$.subscribe(() => {
      count++;
    });

    expect(count).toBe(1);
  });

  it(`sorting$ should emit current sorting`, () => {
    let sorting: ESortingType;
    service.sorting$.subscribe((emittedSorting: ESortingType) => {
      sorting = emittedSorting;
    });

    expect(sorting).toBe(ESortingType.POPULAR);
  });

  it(`isAuthorized$ should emit 'true' values`, () => {
    let isAuthorized: boolean;
    service.isAuthorized$.subscribe((emittedIsAuthorized: boolean) => {
      isAuthorized = emittedIsAuthorized;
    });
    expect(isAuthorized).toBeTrue();
  });


  describe(`switchCityByName`, () => {
    it(`should call switchCityByName method of CityService`, () => {
      const switchCityByName = spyOn(cityService, `switchCityByName`);
      service.switchCityByName(cityList[0].title);
      expect(switchCityByName).toHaveBeenCalledTimes(1);
    });

    it(`should call switchCityByName method of CityService with params`, () => {
      const switchCityByName = spyOn(cityService, `switchCityByName`);
      service.switchCityByName(cityList[0].title);
      expect(switchCityByName).toHaveBeenCalledWith(cityList[0].title);
    });
  });


  describe(`switchHotelSorting`, () => {
    it(`should call switchHotelSorting method of HotelService`, () => {
      const changeSorting = spyOn(hotelService, `changeSorting`);
      service.switchHotelSorting(ESortingType.RATING);
      expect(changeSorting).toHaveBeenCalledTimes(1);
    });

    it(`should call switchHotelSorting method of HotelService with params`, () => {
      const changeSorting = spyOn(hotelService, `changeSorting`);
      service.switchHotelSorting(ESortingType.RATING);
      expect(changeSorting).toHaveBeenCalledWith(ESortingType.RATING);
    });
  });


  describe(`toggleFavoriteStatus`, () => {
    it(`should call toggleFavoriteStatus method of HotelService`, () => {
      const toggleFavoriteStatus = spyOn(hotelService, `toggleFavoriteStatus`);
      service.toggleFavoriteStatus(hotel.id);
      expect(toggleFavoriteStatus).toHaveBeenCalledTimes(1);
    });

    it(`should call toggleFavoriteStatus method of HotelService`, () => {
      const toggleFavoriteStatus = spyOn(hotelService, `toggleFavoriteStatus`);
      service.toggleFavoriteStatus(hotel.id);
      expect(toggleFavoriteStatus).toHaveBeenCalledWith(hotel.id);
    });
  });
});
