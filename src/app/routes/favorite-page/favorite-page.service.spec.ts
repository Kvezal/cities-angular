import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HotelService } from '@services';
import { IHotel } from '@interfaces';

import { FavoritePageService } from './favorite-page.service';
import { IFavoriteLocation } from './favorite-page.interface';


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

describe(`FavoritePageService`, () => {
  let service: FavoritePageService;
  let hotelService: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavoritePageService,
        {
          provide: HotelService,
          useValue: {
            favoriteHotelList$: of(hotelList),
            loadFavoriteHotels: () => null,
            toggleFavoriteStatus: () => null,
            removeNotFavoriteHotelsFromFavoriteList: () => null,
          },
        }
      ],
    });
    service = TestBed.inject(FavoritePageService);
    hotelService = TestBed.inject(HotelService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`locationList$ should emit converted emitted params of HotelService.hotelParams$`, () => {
    let locations: IFavoriteLocation[];
    service.locationList$.subscribe((emittedLocationList: IFavoriteLocation[]) => {
      locations = emittedLocationList;
    });
    expect(locations).toEqual(locationList);
  });

  describe(`toggleFavoriteStatus`, () => {
    it(`should call toggleFavoriteStatus method of HotelService`, () => {
      const toggleFavoriteStatus = spyOn(hotelService, `toggleFavoriteStatus`);
      service.toggleFavoriteStatus(hotelList[0].id);
      expect(toggleFavoriteStatus).toHaveBeenCalledTimes(1);
    });

    it(`should call toggleFavoriteStatus method of HotelService with params`, () => {
      const toggleFavoriteStatus = spyOn(hotelService, `toggleFavoriteStatus`);
      service.toggleFavoriteStatus(hotelList[0].id);
      expect(toggleFavoriteStatus).toHaveBeenCalledWith(hotelList[0].id, false);
    });
  });

  describe(`removeNotFavoriteHotelsFromFavoriteList`, () => {
    it(`should call removeNotFavoriteHotelsFromFavoriteList method of HotelService`, () => {
      const removeNotFavoriteHotelsFromFavoriteList = spyOn(hotelService, `removeNotFavoriteHotelsFromFavoriteList`);
      service.removeNotFavoriteHotelsFromFavoriteList();
      expect(removeNotFavoriteHotelsFromFavoriteList).toHaveBeenCalledTimes(1);
    });

    it(`should call removeNotFavoriteHotelsFromFavoriteList method of HotelService without params`, () => {
      const removeNotFavoriteHotelsFromFavoriteList = spyOn(hotelService, `removeNotFavoriteHotelsFromFavoriteList`);
      service.removeNotFavoriteHotelsFromFavoriteList();
      expect(removeNotFavoriteHotelsFromFavoriteList).toHaveBeenCalledWith();
    });
  });
});
