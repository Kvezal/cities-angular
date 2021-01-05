import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  ICommentParams,
  IUserResponse
} from '@api';
import {
  IComment,
  IHotel
} from '@interfaces';
import {
  AuthService,
  CommentService,
  HotelService
} from '@services';

import { OfferPageService } from './offer-page.service';
import { IOfferPageParams } from './offer-page.interface';
import {
  IMapLocation,
  IMapMarker
} from '@components';


const user: IUserResponse = {
  id: `023dda52-f07b-47ef-a44c-2301f8743149`,
  name: `kvezal`,
  email: `kvezal@gmail.com`,
  image: `assets/images/test/1.jpg`,
};

const hotel: IHotel = {
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
};

const nearestHotelList: IHotel[] = [
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

const commentParams: ICommentParams = {
  text: `Quisque tincidunt pede ac urna. Etiam vestibulum massa rutrum magna.`,
  hotelId: `240d821a-b2e5-437f-afb9-7e840eafba81`,
  rating: 4,
};

const comment: IComment = {
  id: `fe509780-6b89-44db-a669-f984a5f86072`,
  text: commentParams.text,
  createdAt: new Date().toISOString(),
  rating: commentParams.rating,
  user: {
    id: `0a70cb15-3729-46ad-9dc7-b2d0b22c4c9c`,
    name: `uzp1auop9`,
    type: `pro`,
    image: `images/avatars/1.jpg`
  },
};

describe(`OfferPageService`, () => {
  let service: OfferPageService;
  let authService: AuthService;
  let hotelService: HotelService;
  let commentService: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OfferPageService,
        {
          provide: AuthService,
          useValue: {
            user$: of(user),
          },
        },
        {
          provide: HotelService,
          useValue: {
            hotel$: of(hotel),
            nearestHotelList$: of(nearestHotelList),
            loadHotel: () => null,
            loadNearestHotels: () => null,
            toggleFavoriteStatus: () => null,
          },
        },
        {
          provide: CommentService,
          useValue: {
            commentList$: of([comment]),
            loadList: () => null,
            create: () => null,
          }
        }
      ],
    });
    service = TestBed.inject(OfferPageService);
    authService = TestBed.inject(AuthService);
    hotelService = TestBed.inject(HotelService);
    commentService = TestBed.inject(CommentService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`pageParams$ should emit correct pageParams`, () => {
    let pageParams: IOfferPageParams;
    service.pageParams$.subscribe((newPageParams) => {
      pageParams = newPageParams;
    });
    const hotelMarkers: IMapMarker[] = nearestHotelList.map((nearestHotel: IHotel) => ({
      id: nearestHotel.location.id,
      coords: {
        lat: nearestHotel.location.latitude,
        lng: nearestHotel.location.longitude,
      }
    }));
    const location: IMapLocation = {
      id: hotel.location.id,
      zoom: hotel.location.zoom,
      coords: {
        lat: hotel.location.latitude,
        lng: hotel.location.longitude,
      },
    };
    expect(pageParams).toEqual({
      isAuthorized: true,
      hotel,
      nearestHotelList,
      location: {
        id: hotel.location.id,
        zoom: hotel.location.zoom,
        coords: {
          lat: hotel.location.latitude,
          lng: hotel.location.longitude,
        },
      },
      markers: [
        ...hotelMarkers,
        {
          id: location.id,
          coords: location.coords,
        },
      ],
      commentList: [comment],
    });
  });

  describe(`loadContent`, () => {
    it(`should call loadHotel`, () => {
      const loadHotel = spyOn(hotelService, `loadHotel`);
      service.loadContent(hotel.id);
      expect(loadHotel).toHaveBeenCalledTimes(1);
    });

    it(`should call loadHotel with params`, () => {
      const loadHotel = spyOn(hotelService, `loadHotel`);
      service.loadContent(hotel.id);
      expect(loadHotel).toHaveBeenCalledWith(hotel.id);
    });

    it(`should call loadNearestHotels`, () => {
      const loadNearestHotels = spyOn(hotelService, `loadNearestHotels`);
      service.loadContent(hotel.id);
      expect(loadNearestHotels).toHaveBeenCalledTimes(1);
    });

    it(`should call loadNearestHotels with params`, () => {
      const loadNearestHotels = spyOn(hotelService, `loadNearestHotels`);
      service.loadContent(hotel.id);
      expect(loadNearestHotels).toHaveBeenCalledWith(hotel.id);
    });

    it(`should call loadList of CommentService`, () => {
      const loadList = spyOn(commentService, `loadList`);
      service.loadContent(hotel.id);
      expect(loadList).toHaveBeenCalledTimes(1);
    });

    it(`should call loadList of CommentService with params`, () => {
      const loadList = spyOn(commentService, `loadList`);
      service.loadContent(hotel.id);
      expect(loadList).toHaveBeenCalledWith(hotel.id);
    });
  });

  describe(`toggleFavoriteStatus`, () => {
    it(`should call`, () => {
      const toggleFavoriteStatus = spyOn(hotelService, `toggleFavoriteStatus`);
      service.toggleFavoriteStatus(hotel.id);
      expect(toggleFavoriteStatus).toHaveBeenCalledTimes(1);
    });

    it(`should call with params`, () => {
      const toggleFavoriteStatus = spyOn(hotelService, `toggleFavoriteStatus`);
      service.toggleFavoriteStatus(hotel.id);
      expect(toggleFavoriteStatus).toHaveBeenCalledWith(hotel.id);
    });
  });

  describe(`createComment`, () => {
    it(`should call`, () => {
      const create = spyOn(commentService, `create`);
      service.createComment(commentParams);
      expect(create).toHaveBeenCalledTimes(1);
    });

    it(`should call with params`, () => {
      const create = spyOn(commentService, `create`);
      service.createComment(commentParams);
      expect(create).toHaveBeenCalledWith(commentParams);
    });
  });
});
