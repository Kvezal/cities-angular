import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EFavoriteFlagType, FavoriteFlagModule } from '@components/favorite-flag';
import { RatingModule } from '@components/rating';

import { HotelCardComponent } from './hotel-card.component';
import { EHotelCardType } from './hotel-card.interface';


describe(`HotelCardComponent`, () => {
  let component: HotelCardComponent;
  let fixture: ComponentFixture<HotelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FavoriteFlagModule,
        RatingModule,
      ],
      declarations: [
        HotelCardComponent,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HotelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    component.title = `Nice, cozy, warm big bed apartment`;
    component.price = 100;
    component.rating = 4;
    component.isPremium = true;
    component.hotelType = `Apartment`;
    component.image = `assets/images/test/apartment-03.jpg`;
    component.isFavorite = true;
    component.cardType = EHotelCardType.SMALL;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe(`title`, () => {
    it(`should be empty by default`, () => {
      const title = fixture.nativeElement.querySelector(`.hotel-card__name`);
      expect(title.textContent.trim()).toBe(``);
    });

    it(`should set title`, () => {
      component.title = `test`;
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector(`.hotel-card__name`);
      expect(title.textContent.trim()).toBe(`test`);
    });
  });

  describe(`price`, () => {
    it(`should have "€0" by default`, () => {
      const price = fixture.nativeElement.querySelector(`.hotel-card__price-value`);
      expect(price.textContent.trim()).toBe(`€0`);
    });

    it(`should set price`, () => {
      component.price = 100;
      fixture.detectChanges();
      const price = fixture.nativeElement.querySelector(`.hotel-card__price-value`);
      expect(price.textContent.trim()).toBe(`€100`);
    });
  });

  describe(`rating`, () => {
    it(`should have 0 by default`, () => {
      const rating = fixture.nativeElement.querySelector(`.hotel-card__rating`);
      expect(+rating.getAttribute(`ng-reflect-value`)).toBe(0);
    });

    it(`should set value in rating component`, () => {
      component.rating = 3;
      fixture.detectChanges();
      const rating = fixture.nativeElement.querySelector(`.hotel-card__rating`);
      expect(+rating.getAttribute(`ng-reflect-value`)).toBe(3);
    });
  });

  describe(`isPremium`, () => {
    it(`shouldn't have isPremium flag by default`, () => {
      const premium = fixture.nativeElement.querySelector(`.hotel-card__mark`);
      expect(premium).toBeNull();
    });

    it(`should have isPremium flag if "true"`, () => {
      component.isPremium = true;
      fixture.detectChanges();
      const premium = fixture.nativeElement.querySelector(`.hotel-card__mark`);
      expect(premium).not.toBeNull();
    });
  });

  describe(`hotelType`, () => {
    it(`should be empty by default`, () => {
      const hotelType = fixture.nativeElement.querySelector(`.hotel-card__type`);
      expect(hotelType.textContent.trim()).toBe(``);
    });

    it(`should set hotel type`, () => {
      component.hotelType = `test`;
      fixture.detectChanges();
      const hotelType = fixture.nativeElement.querySelector(`.hotel-card__type`);
      expect(hotelType.textContent.trim()).toBe(`test`);
    });
  });

  describe(`image`, () => {
    it(`shouldn't have image by default`, () => {
      const image = fixture.nativeElement.querySelector(`.hotel-card__image`);
      expect(image).toBeNull();
    });

    it(`should set image src`, () => {
      component.image = `assets/images/test/apartment-03.jpg`;
      fixture.detectChanges();
      const image = fixture.nativeElement.querySelector(`.hotel-card__image`);
      expect(image.src).toMatch(/assets\/images\/test\/apartment\-03.jpg$/);
    });
  });

  describe(`isFavorite`, () => {
    it(`should set "false" by default`, () => {
      const favorite = fixture.nativeElement.querySelector(`.hotel-card__favorite`);
      expect(favorite.getAttribute(`ng-reflect-is-active`)).toBe(`false`);
    });

    it(`should set isFavorite flag`, () => {
      component.isFavorite = true;
      fixture.detectChanges();
      const favorite = fixture.nativeElement.querySelector(`.hotel-card__favorite`);
      expect(favorite.getAttribute(`ng-reflect-is-active`)).toBe(`true`);
    });

    it(`should emit isFavorite value`, () => {
      let result;
      component.changeIsFavoriteValue.subscribe((value) => {
        result = value;
      });
      const favorite = fixture.nativeElement.querySelector(`.hotel-card__favorite`);
      component.isFavorite = true;
      fixture.detectChanges();
      expect(result).toBe(true);

      component.isFavorite = false;
      fixture.detectChanges();
      expect(result).toBe(false);
    });
  });

  describe(`cardType`, () => {
    it(`should have middle by default`, () => {
      expect(fixture.nativeElement.getAttribute(`cardType`)).toBe(EHotelCardType.MIDDLE);
    });

    it(`should set card type`, () => {
      Object.values(EHotelCardType).forEach((cardType: EHotelCardType) => {
        component.cardType = cardType;
        fixture.detectChanges();
        expect(fixture.nativeElement.getAttribute(`cardType`)).toBe(cardType);
      });
    });

    it(`should change favoriteFlagType`, () => {
      component.cardType = EHotelCardType.SMALL;
      expect(component.favoriteFlagType).toBe(EFavoriteFlagType.MIDDLE);

      component.cardType = EHotelCardType.MIDDLE;
      expect(component.favoriteFlagType).toBe(EFavoriteFlagType.SMALL_SKEW);
    });

    it(`should change favorite type attribute`, () => {
      const favorite = fixture.nativeElement.querySelector(`.hotel-card__favorite`);

      component.cardType = EHotelCardType.SMALL;
      fixture.detectChanges();
      expect(favorite.getAttribute(`ng-reflect-type`)).toBe(EFavoriteFlagType.MIDDLE);

      component.cardType = EHotelCardType.MIDDLE;
      fixture.detectChanges();
      expect(favorite.getAttribute(`ng-reflect-type`)).toBe(EFavoriteFlagType.SMALL_SKEW);
    });
  });
});

