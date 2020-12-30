import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  first,
  map
} from 'rxjs/operators';

import { ESortingType } from '@api';
import {
  IMapCity,
  IMapMarker,
  IMenuItem,
  ISelectOption
} from '@components';
import {
  ICity,
  IHotel,
  IList
} from '@interfaces';
import {
  CityService,
  HotelService
} from '@services';


@Injectable()
export class CityPageService {
  public city$: Observable<ICity> = this._cityService.city$;

  public mapCityParams$: Observable<IMapCity> = this._cityService
    .city$
    .pipe(
      map((city: ICity) => this._mapCityParams(city))
    );

  public menuList$: Observable<IMenuItem[]> = this._cityService
    .cityList$
    .pipe(
      first(),
      map((cityList: ICity[]) => this._getMenuList(cityList))
    );

  public hotelParams$ = this._hotelService.hotelParams$;

  public mapMarkerList$: Observable<IMapMarker[]> = this._hotelService
    .hotelParams$
    .pipe(
      map((hotelParams: IList<IHotel>) => this._getMarkerList(hotelParams.list))
    );

  public sorting$ = this._hotelService
    .sorting$
    .pipe(
      first(),
    );

  public sortingOptions: ISelectOption[] = [
    {
      name: `Popular`,
      value: ESortingType.POPULAR,
    },
    {
      name: `Price: low to high`,
      value: ESortingType.LOW_PRICE
    },
    {
      name: `Price: high to low`,
      value: ESortingType.HIGH_PRICE
    },
    {
      name: `Top rated first`,
      value: ESortingType.RATING
    },
  ];


  constructor(
    private readonly _cityService: CityService,
    private readonly _hotelService: HotelService,
  ) {
  }


  public switchCityByName(cityName: string): void {
    this._cityService.switchCityByName(cityName);
  }


  public switchHotelSorting(sorting: ESortingType): void {
    this._hotelService.changeSorting(sorting);
  }


  public toggleFavoriteStatus(hotelId: string): void {
    this._hotelService.toggleFavoriteStatus(hotelId);
  }


  private _mapCityParams(city: ICity): IMapCity {
    return {
      coords: {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      zoom: city.location.zoom,
    };
  }


  private _getMenuList(cityList: ICity[]): IMenuItem[] {
    return cityList.map(city => ({
      id: city.id,
      path: city.title,
      name: city.title,
    }));
  }


  private _getMarkerList(hotelList: IHotel[]): IMapMarker[] {
    return hotelList.map((hotel: IHotel) => ({
      id: hotel.location.id,
      coords: {
        lat: hotel.location.latitude,
        lng: hotel.location.longitude,
      },
    }));
  }
}
