import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import {
  Observable,
  of
} from 'rxjs';

import {
  CityLinkModule,
  FooterModule,
  HotelCardModule
} from '@components';
import { IHotel } from '@interfaces';

import { FavoritePageComponent } from './favorite-page.component';
import { IFavoriteLocation } from './favorite-page.interface';
import { FavoritePageService } from './favorite-page.service';


const hotelList: IHotel[] = [
  {
    id: `9e76ea0e-1cb3-4291-898d-9d415f100582`,
    title: `Tile House`,
    description: `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.`,
    bedroomCount: 3,
    maxAdultCount: 8,
    price: 1085,
    isPremium: true,
    rating: 2.88,
    features: [
      `Towels`,
      `Baby seat`,
      `Laptop friendly workspace`,
      `Washing machine`,
      `Air conditioning`,
      `Cable TV`,
      `Fridge`,
      `Breakfast`,
      `Dishwasher`
    ],
    type: `room`,
    city: {
      id: 'ea3da133-91b9-4c86-b767-576ffcbbb456',
      title: 'Amsterdam',
      location: {
        id: '5176204d-f210-46df-88a5-9ad3981318df',
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 15
      }
    },
    location: {
      id: `74cbfbb7-241d-4c7b-9e2a-ae6bdda192d9`,
      latitude: 52.374761,
      longitude: 4.897948,
      zoom: 16
    },
    host: {
      id: `b8a0cfff-a381-4f2b-ac85-98be1d0979a5`,
      name: `3tck1sbfo`,
      image: `assets/images/test/1.jpg`,
      type: `standard`
    },
    images: [
      `assets/images/test/apartment-03.jpg`
    ],
    isFavorite: true
  },
  {
    id: `c138891e-4891-4815-9e8f-d6c1a304e9c4`,
    title: `The house among olive `,
    description: `Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.`,
    bedroomCount: 2,
    maxAdultCount: 5,
    price: 593,
    isPremium: true,
    rating: 2.77,
    features: [
      `Cable TV`,
      `Fridge`,
      `Washer`,
      `Air conditioning`,
      `Towels`,
      `Breakfast`,
      `Coffee machine`,
      `Washing machine`,
      `Laptop friendly workspace`
    ],
    type: `apartment`,
    city: {
      id: `76be0570-b99d-41aa-9dd9-96f63d7b23f5`,
      title: `Dusseldorf`,
      location: {
        id: `96cebc2e-8a50-4a5c-b305-b06aec3f92e5`,
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 15
      }
    },
    location: {
      id: `0d3c6402-0df3-461d-a2e3-44c1a8de7ca1`,
      latitude: 51.2277,
      longitude: 6.78123,
      zoom: 16
    },
    host: {
      id: `5808cb1a-4f5e-41b4-b423-fb65d11e10aa`,
      name: `7cgx4n2s3`,
      image: `assets/images/test/1.jpg`,
      type: `standard`
    },
    images: [
      `assets/images/test/apartment-03.jpg`
    ],
    isFavorite: true
  },
];

const locationList: IFavoriteLocation[] = [
  {
    city: hotelList[0].city.title,
    list: [hotelList[0]],
  },
  {
    city: hotelList[1].city.title,
    list: [hotelList[1]],
  },
];

describe(`FavoritePageComponent`, () => {
  let component: FavoritePageComponent;
  let fixture: ComponentFixture<FavoritePageComponent>;
  let service: FavoritePageService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: ``, component: FavoritePageComponent },
        ]),
        CityLinkModule,
        FooterModule,
        HotelCardModule,
      ],
      declarations: [ FavoritePageComponent ],
      providers: [
        {
          provide: FavoritePageService,
          useValue: {
            get locationList$(): Observable<IFavoriteLocation[]> {
              return of(locationList);
            },
            toggleFavoriteStatus: () => null,
            removeNotFavoriteHotelsFromFavoriteList: () => null,
          },
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePageComponent);
    service = TestBed.inject(FavoritePageService);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  it(`should call removeNotFavoriteHotelsFromFavoriteList of FavoritePageService when component destroy`, () => {
    const removeNotFavoriteHotelsFromFavoriteList = spyOn(service, `removeNotFavoriteHotelsFromFavoriteList`).and.callThrough();
    fixture.destroy();
    expect(removeNotFavoriteHotelsFromFavoriteList).toHaveBeenCalledTimes(1);
  });


  describe(`toggleFavoriteStatus`, () => {
    it(`changeIsFavoriteValue should call toggleFavoriteStatus of FavoritePageService`, () => {
      const toggleFavoriteStatus = spyOn(service, `toggleFavoriteStatus`).and.callThrough();
      const hotelCardList = fixture.debugElement.queryAll(By.css(`app-hotel-card`));
      hotelCardList[0].componentInstance.changeIsFavoriteValue.next();
      expect(toggleFavoriteStatus).toHaveBeenCalledTimes(1);
    });

    it(`changeIsFavoriteValue should call toggleFavoriteStatus of FavoritePageService with params`, () => {
      const toggleFavoriteStatus = spyOn(service, `toggleFavoriteStatus`).and.callThrough();
      const hotelCardList = fixture.debugElement.queryAll(By.css(`app-hotel-card`));
      hotelCardList[0].componentInstance.changeIsFavoriteValue.next();
      expect(toggleFavoriteStatus).toHaveBeenCalledWith(hotelList[0].id);
    });
  });


  describe(`locationList$`, () => {
    it(`should display hotels if locationList$ has locations`, () => {
      const hotelCardList = fixture.debugElement.queryAll(By.css(`app-hotel-card`));
      expect(hotelCardList).toHaveSize(hotelList.length);
      const emptyContent = fixture.nativeElement.querySelector(`.favorites--empty`);
      expect(emptyContent).toBeNull();
    });

    it(`should display empty list if locationList$ haven't locations`, () => {
      spyOnProperty(service, `locationList$`, `get`).and.returnValue(of(null));
      fixture = TestBed.createComponent(FavoritePageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const emptyContent = fixture.debugElement.query(By.css(`.favorites--empty`));
      expect(emptyContent).not.toBeNull();
    });

    it(`should split to city hotel list`, () => {
      const hotelLists = fixture.debugElement.queryAll(By.css(`.favorites__locations-items`));
      expect(hotelLists).toHaveSize(locationList.length);
    });

    it(`app-city-link should contain city`, () => {
      const cityLinks = fixture.debugElement.queryAll(By.css(`app-city-link`));
      expect(cityLinks).toHaveSize(locationList.length);
    });

    it(`app-city-link should has hash property`, () => {
      const cityLinks = fixture.debugElement.queryAll(By.css(`app-city-link`));
      cityLinks.forEach((link: DebugElement, index: number) => {
        expect(link.componentInstance.hash).toBe(hotelList[index].city.title);
      });
      expect(cityLinks).toHaveSize(locationList.length);
    });
  });
});
