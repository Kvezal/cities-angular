import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import {
  HotelCardModule,
  IMapCity,
  IMapMarker,
  IMenuItem,
  MapModule,
  MenuModule,
  SelectModule
} from '@components';

import { CityPageComponent } from './city-page.component';
import { CityPageService } from './city-page.service';
import {
  ICity,
  IHotel,
  IList
} from '@interfaces';
import { ESortingType } from '@api';
import { By } from '@angular/platform-browser';


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

const mapCityParams: IMapCity = {
  coords: {
    lat: cityList[0].location.latitude,
    lng: cityList[0].location.longitude,
  },
  zoom: cityList[0].location.zoom,
};

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

describe(`CityPageComponent`, () => {
  let component: CityPageComponent;
  let fixture: ComponentFixture<CityPageComponent>;
  let service: CityPageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MenuModule,
        SelectModule,
        MapModule,
        HotelCardModule,
      ],
      declarations: [
        CityPageComponent,
      ],
      providers: [
        {
          provide: CityPageService,
          useValue: {
            city$: of(cityList[0]),
            hotelParams$: of(hotelParams),
            menuList$: of(menuList),
            sorting$: of(ESortingType.POPULAR),
            mapCityParams$: of(mapCityParams),
            mapMarkerList$: of(markerList),
            sortingOptions: [],
            switchCityByName: () => null,
            switchHotelSorting: () => null,
            toggleFavoriteStatus: () => null,
          },
        },
      ],
    })
      .compileComponents();

    service = TestBed.inject(CityPageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  it(`should contain app-menu`, () => {
    const menu = fixture.nativeElement.querySelector(`app-menu`);
    expect(menu).not.toBeNull();
  });

  it(`should contain app-select`, () => {
    const select = fixture.nativeElement.querySelector(`app-select`);
    expect(select).not.toBeNull();
  });

  it(`should contain app-hotel-card list`, () => {
    const hotelCardList = fixture.nativeElement.querySelectorAll(`app-hotel-card`);
    expect(hotelCardList).toHaveSize(HOTEL_COUNT);
  });

  it(`should contain app-map`, () => {
    const map = fixture.nativeElement.querySelector(`app-map`);
    expect(map).not.toBeNull();
  });


  describe(`switchCityByName`, () => {
    it(`should be call when active menu option changed`, () => {
      const switchCityByName = spyOn(component, `switchCityByName`).and.callThrough();
      const menu = fixture.debugElement.query(By.css(`app-menu`)).componentInstance;
      menu.changeActiveOutput.next(menuList[1].path);
      expect(switchCityByName).toHaveBeenCalledTimes(1);
    });

    it(`should be called with correct params`, () => {
      const switchCityByName = spyOn(component, `switchCityByName`).and.callThrough();
      const menu = fixture.debugElement.query(By.css(`app-menu`)).componentInstance;
      menu.changeActiveOutput.next(menuList[1].path);
      expect(switchCityByName).toHaveBeenCalledWith(menuList[1].path);
    });

    describe(`switchCityByName method of CityPageService`, () => {
      it(`should call`, () => {
        const switchCityByName = spyOn(service, `switchCityByName`);
        component.switchCityByName(menuList[1].path);
        expect(switchCityByName).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        const switchCityByName = spyOn(service, `switchCityByName`);
        component.switchCityByName(menuList[1].path);
        expect(switchCityByName).toHaveBeenCalledWith(menuList[1].path);
      });
    });
  });


  describe(`switchHotelSorting`, () => {
    it(`should be call when active select option changed`, () => {
      const switchHotelSorting = spyOn(component, `switchHotelSorting`).and.callThrough();
      const sorting = fixture.debugElement.query(By.css(`app-select`)).componentInstance;
      sorting.changeSelectionValueOutput.next(ESortingType.RATING);
      expect(switchHotelSorting).toHaveBeenCalledTimes(1);
    });

    it(`should be called with correct params`, () => {
      const switchHotelSorting = spyOn(component, `switchHotelSorting`).and.callThrough();
      const sorting = fixture.debugElement.query(By.css(`app-select`)).componentInstance;
      sorting.changeSelectionValueOutput.next(ESortingType.RATING);
      expect(switchHotelSorting).toHaveBeenCalledWith(ESortingType.RATING);
    });

    describe(`switchHotelSorting method of CityPageService`, () => {
      it(`should call`, () => {
        const switchHotelSorting = spyOn(service, `switchHotelSorting`).and.callThrough();
        component.switchHotelSorting(ESortingType.RATING);
        expect(switchHotelSorting).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        const switchHotelSorting = spyOn(service, `switchHotelSorting`).and.callThrough();
        component.switchHotelSorting(ESortingType.RATING);
        expect(switchHotelSorting).toHaveBeenCalledWith(ESortingType.RATING);
      });
    });
  });


  describe(`toggleFavoriteStatus`, () => {
    it(`should be call when hotel card emitted changeIsFavoriteValue`, () => {
      const changeIsFavoriteValue = spyOn(component, `toggleFavoriteStatus`).and.callThrough();
      const hotelCardList = fixture.debugElement.queryAll(By.css(`app-hotel-card`));
      hotelCardList[0].componentInstance.changeIsFavoriteValue.next();
      expect(changeIsFavoriteValue).toHaveBeenCalledTimes(1);
    });

    it(`should be called with correct params`, () => {
      const changeIsFavoriteValue = spyOn(component, `toggleFavoriteStatus`).and.callThrough();
      const hotelCardList = fixture.debugElement.queryAll(By.css(`app-hotel-card`));
      hotelCardList[0].componentInstance.changeIsFavoriteValue.next();
      expect(changeIsFavoriteValue).toHaveBeenCalledWith(hotel.id);
    });

    describe(`toggleFavoriteStatus method of CityPageService`, () => {
      it(`should call`, () => {
        const toggleFavoriteStatus = spyOn(service, `toggleFavoriteStatus`).and.callThrough();
        component.toggleFavoriteStatus(hotel.id);
        expect(toggleFavoriteStatus).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        const toggleFavoriteStatus = spyOn(service, `toggleFavoriteStatus`).and.callThrough();
        component.toggleFavoriteStatus(hotel.id);
        expect(toggleFavoriteStatus).toHaveBeenCalledWith(hotel.id);
      });
    });
  });


  describe(`setActiveMarkerId`, () => {
    it(`should be call when mouseenter on hotel card`, () => {
      const setActiveMarkerId = spyOn(component, `setActiveMarkerId`).and.callThrough();
      const hotelCardList = fixture.nativeElement.querySelectorAll(`app-hotel-card`);
      const event = new Event('mouseenter');
      hotelCardList[0].dispatchEvent(event);
      expect(setActiveMarkerId).toHaveBeenCalledTimes(1);
    });

    it(`should be call when mouseenter on hotel card`, () => {
      const setActiveMarkerId = spyOn(component, `setActiveMarkerId`).and.callThrough();
      const hotelCardList = fixture.nativeElement.querySelectorAll(`app-hotel-card`);
      const event = new Event('mouseenter');
      hotelCardList[0].dispatchEvent(event);
      expect(setActiveMarkerId).toHaveBeenCalledWith(hotel.location.id);
    });

    it(`should change activeMarkerId`, () => {
      const hotelCardList = fixture.nativeElement.querySelectorAll(`app-hotel-card`);
      const event = new Event('mouseenter');
      hotelCardList[0].dispatchEvent(event);
      expect(component.activeMarkerId).toBe(hotel.location.id);
    });
  });
});
