import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { OfferPageComponent } from './offer-page.component';
import {
  CommonModule,
  Location
} from '@angular/common';
import {
  FavoriteFlagComponent,
  FavoriteFlagModule,
  GalleryComponent,
  GalleryModule,
  HotelCardComponent,
  HotelCardModule,
  IMapLocation,
  IMapMarker,
  MapComponent,
  MapModule,
  RatingComponent,
  RatingModule
} from '@components';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { OfferPageService } from './offer-page.service';
import { of } from 'rxjs';
import {
  ICommentParams,
  IUserResponse
} from '@api';
import {
  IComment,
  IHotel
} from '@interfaces';
import { IOfferPageParams } from './offer-page.interface';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router
} from '@angular/router';


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
  hotelId:  hotel.id,
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
    image: `assets/images/test/1.jpg`
  },
};

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

const pageParams: IOfferPageParams = {
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
};

describe(`OfferPageComponent`, () => {
  let component: OfferPageComponent;
  let fixture: ComponentFixture<OfferPageComponent>;
  let service: OfferPageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OfferPageComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: `:id`,
            component: OfferPageComponent,
          },
        ]),
        CommonModule,
        HotelCardModule,
        RatingModule,
        FavoriteFlagModule,
        MapModule,
        ReactiveFormsModule,
        GalleryModule,
      ],
      providers: [
        {
          provide: OfferPageService,
          useValue: {
            pageParams$: of(pageParams),
            loadContent: () => null,
            toggleFavoriteStatus: () => null,
            createComment: () => null,
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: hotel.id,
            }),
            snapshot: {
              params: {
                id: hotel.id,
              },
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPageComponent);
    service = TestBed.inject(OfferPageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`pageParams$`, () => {
    it(`page should contain premium mark`, () => {
      const premium: HTMLDivElement = fixture.nativeElement.querySelector(`.property__mark`);
      expect(premium).not.toBeNull();
    });

    it(`page should contain correct hotel title`, () => {
      const title: HTMLTitleElement = fixture.nativeElement.querySelector(`.property__name`);
      expect(title.textContent).toMatch(hotel.title);
    });

    it(`should contain correct rating`, () => {
      const rating: RatingComponent = fixture.debugElement.query(By.css(`.property__rating app-rating`)).componentInstance;
      expect(rating.value).toBe(hotel.rating);
    });

    it(`should display correct rating`, () => {
      const ratingSpan: HTMLSpanElement = fixture.nativeElement.querySelector(`.property__rating-value`);
      expect(ratingSpan.textContent).toMatch(`${hotel.rating}`);
    });

    it(`should contain correct offer type`, () => {
      const offerType: HTMLLIElement = fixture.nativeElement.querySelector(`.property__feature--entire`);
      expect(offerType.textContent).toMatch(hotel.type);
    });

    it(`should contain correct bedroom count`, () => {
      const bedroomCount: HTMLLIElement = fixture.nativeElement.querySelector(`.property__feature--bedrooms`);
      expect(bedroomCount.textContent).toMatch(`${hotel.bedroomCount}`);
    });

    it(`should contain correct bedroom count`, () => {
      const maxAdultCount: HTMLLIElement = fixture.nativeElement.querySelector(`.property__feature--adults`);
      expect(maxAdultCount.textContent).toMatch(`${hotel.maxAdultCount}`);
    });

    it(`should contain correct price`, () => {
      const price: HTMLElement = fixture.nativeElement.querySelector(`.property__price-value`);
      expect(price.textContent).toMatch(`${hotel.price}`);
    });

    it(`should contain features`, () => {
      const hotelFeatures: HTMLLIElement[] = fixture.nativeElement.querySelectorAll(`.property__inside-item`);
      hotelFeatures.forEach((hotelFeature: HTMLLIElement) => {
        expect(hotel.features).toContain(hotelFeature.textContent.trim());
      });
      expect(hotelFeatures).toHaveSize(hotel.features.length);
    });

    it(`should contain correct host user avatar`, () => {
      const hostUserAvatar: HTMLImageElement = fixture.nativeElement.querySelector(`.property__avatar`);
      expect(hostUserAvatar.src).toMatch(hotel.host.image);
    });

    it(`should contain correct host user name`, () => {
      const hostUserName: HTMLSpanElement = fixture.nativeElement.querySelector(`.property__user-name`);
      expect(hostUserName.textContent).toMatch(hotel.host.name);
    });

    it(`should contain correct hotel description`, () => {
      const hotelDescription: HTMLParagraphElement = fixture.nativeElement.querySelector(`.property__description .property__text`);
      expect(hotelDescription.textContent).toMatch(hotel.description);
    });

    it(`should contain hotel card list`, () => {
      const hotelCards: HotelCardComponent[] = fixture.nativeElement.querySelectorAll(`app-hotel-card`);
      expect(hotelCards).toHaveSize(nearestHotelList.length);
    });

    it(`should contain map element`, () => {
      const mapLocation: MapComponent = fixture.nativeElement.querySelector(`app-map`);
      expect(mapLocation).not.toBeNull();
    });
  });

  describe(`gallery`, () => {
    it(`should create app-gallery`, () => {
      const gallery: GalleryComponent = fixture.nativeElement.querySelector(`app-gallery`);
      expect(gallery).not.toBeNull();
    });

    it(`app-gallery should contain correct images property`, () => {
      const gallery: GalleryComponent = fixture.debugElement.query(By.css(`app-gallery`)).componentInstance;
      expect(gallery.images).toEqual(hotel.images);
    });
  });

  describe(`favorite flag`, () => {
    it(`page should contain favorite flag`, () => {
      const favoriteFlag: FavoriteFlagComponent = fixture.nativeElement.querySelector(`.property__bookmark`);
      expect(favoriteFlag).not.toBeNull();
    });

    it(`event changeIsActiveOutput should call toggleFavoriteStatus method`, () => {
      const toggleFavoriteStatus = spyOn(component, `toggleFavoriteStatus`).and.callThrough();
      const favoriteFlag: FavoriteFlagComponent = fixture.debugElement.query(By.css(`.property__bookmark`)).componentInstance;
      favoriteFlag.changeIsActiveOutput.next();
      expect(toggleFavoriteStatus).toHaveBeenCalledTimes(1);
    });

    it(`event changeIsActiveOutput should call toggleFavoriteStatus method with hotelId`, () => {
      const toggleFavoriteStatus = spyOn(component, `toggleFavoriteStatus`).and.callThrough();
      const favoriteFlag: FavoriteFlagComponent = fixture.debugElement.query(By.css(`.property__bookmark`)).componentInstance;
      favoriteFlag.changeIsActiveOutput.next();
      expect(toggleFavoriteStatus).toHaveBeenCalledWith(hotel.id);
    });
  });

  describe(`comment list`, () => {
    it(`should contain comment amount`, () => {
      const commentAmount: HTMLSpanElement = fixture.nativeElement.querySelector(`.property__reviews-amount`);
      expect(commentAmount.textContent).toMatch(`1`);
    });

    it(`should contain comment with correct image`, () => {
      const commentUserImage: HTMLImageElement = fixture.nativeElement.querySelector(`.property__reviews-avatar`);
      expect(commentUserImage.src).toMatch(comment.user.image);
    });

    it(`should contain comment with correct name`, () => {
      const commentUserName: HTMLImageElement = fixture.nativeElement.querySelector(`.property__reviews-user-name`);
      expect(commentUserName.textContent).toMatch(comment.user.name);
    });

    it(`should contain comment with correct rating`, () => {
      const commentHotelRating: RatingComponent = fixture.debugElement
        .query(By.css(`.property__reviews-info app-rating`))
        .componentInstance;
      expect(commentHotelRating.value).toBe(comment.rating);
    });
  });

  describe(`comment form`, () => {
    it(`button should be disabled if comment text contain less then 50 characters`, () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector(`.property__reviews-submit`);
      component.commentForm.setValue({
        rating: 5,
        text: Array(49).fill(``).map((character: string) => `c`).join(``),
      });
      fixture.detectChanges();
      expect(button.disabled).toBeTrue();
    });

    it(`button shouldn't be disabled if comment text contain equal or more then 50 characters`, () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector(`.property__reviews-submit`);
      component.commentForm.setValue({
        rating: 5,
        text: Array(50).fill(``).map((character: string) => `c`).join(``),
      });
      fixture.detectChanges();
      expect(button.disabled).toBeFalse();
    });

    it(`button should be disables if rating value less then 1 and more then 5`, () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector(`.property__reviews-submit`);
      component.commentForm.setValue({
        rating: 0,
        text: Array(50).fill(``).map((character: string) => `c`).join(``),
      });
      fixture.detectChanges();
      expect(button.disabled).toBeTrue();

      component.commentForm.setValue({
        rating: 6,
        text: Array(50).fill(``).map((character: string) => `c`).join(``),
      });
      fixture.detectChanges();
      expect(button.disabled).toBeTrue();
    });

    it(`button shouldn't be disables if rating value equal or more then 1`, () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector(`.property__reviews-submit`);
      component.commentForm.setValue({
        rating: 1,
        text: Array(50).fill(``).map((character: string) => `c`).join(``),
      });
      fixture.detectChanges();
      expect(button.disabled).toBeFalse();
      component.commentForm.setValue({
        rating: 5,
        text: Array(50).fill(``).map((character: string) => `c`).join(``),
      });
      fixture.detectChanges();
      expect(button.disabled).toBeFalse();
    });

    it(`shouldn't submit invalid form`, () => {
      const submit = spyOn(component, `submit`);
      const button: HTMLButtonElement = fixture.nativeElement.querySelector(`.property__reviews-submit`);
      component.commentForm.setValue({
        rating: 5,
        text: ``,
      });
      fixture.detectChanges();
      button.click();
      expect(submit).toHaveBeenCalledTimes(0);
    });

    it(`should submit valid form`, () => {
      const submit = spyOn(component, `submit`);
      const button: HTMLButtonElement = fixture.nativeElement.querySelector(`.property__reviews-submit`);
      component.commentForm.setValue({
        rating: 5,
        text: Array(50).fill(``).map((character: string) => `c`).join(``),
      });
      fixture.detectChanges();
      button.click();
      expect(submit).toHaveBeenCalledTimes(1);
    });

    it(`should submit valid form with correct params`, () => {
      const createComment = spyOn(service, `createComment`);
      component.commentForm.setValue({
        rating: commentParams.rating,
        text: commentParams.text,
      });
      fixture.detectChanges();
      const formButton: HTMLButtonElement = fixture.nativeElement.querySelector(`.property__reviews-submit`);
      formButton.click();
      expect(createComment).toHaveBeenCalledWith(commentParams);
    });
  });
});
