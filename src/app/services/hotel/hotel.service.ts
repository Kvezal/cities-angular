import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject
} from 'rxjs';
import { map } from 'rxjs/operators';

import {
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

import { CityService } from '../city';


const NEARBY_HOTEL_COUNT = 3;


@Injectable({
  providedIn: `root`
})
export class HotelService {
  private _hotelMap: Map<string, Map<ESortingType, IList<IHotel>>> = new Map([]);

  private _hotelParamsReplaySubject: ReplaySubject<IList<IHotel>> = new ReplaySubject(1);
  public hotelParams$: Observable<IList<IHotel>> = this._hotelParamsReplaySubject.asObservable();

  private _favoriteHotelListBehaviorSubject: BehaviorSubject<IHotel[]> = new BehaviorSubject([]);
  public favoriteHotelList$: Observable<IHotel[]> = this._favoriteHotelListBehaviorSubject.asObservable();

  private _sortingBehaviorSubject: BehaviorSubject<ESortingType> = new BehaviorSubject(ESortingType.POPULAR);
  public sorting$: Observable<ESortingType> = this._sortingBehaviorSubject.asObservable();


  constructor(
    private readonly _hotelApiService: HotelApiService,
    private readonly _favoriteApiService: FavoriteApiService,
    private readonly _cityService: CityService,
  ) {
    this._subscribeToCityAndSorting();
  }


  private _subscribeToCityAndSorting(): void {
    combineLatest([
      this._cityService.city$,
      this._sortingBehaviorSubject,
    ])
      .subscribe(([city, sorting]) => {
        this.updateList(city, sorting);
      });
  }


  public updateList(city: ICity, sorting: ESortingType): void {
    const hotelParams: IList<IHotel> = this._hotelMap.get(city.id)?.get(sorting);
    if (hotelParams) {
      this._hotelParamsReplaySubject.next(hotelParams);
    } else {
      this._loadList(city, sorting);
    }
  }


  private _loadList(city: ICity, sorting: ESortingType): void {
    this._hotelApiService.loadList({
      cityId: city.id,
      sorting,
    })
      .subscribe((hotelList: IHotel[]) => {
        const hotelParams = {
          list: hotelList,
        };
        const cityHotelMap = this._hotelMap.get(city.id);
        if (cityHotelMap) {
          cityHotelMap.set(sorting, hotelParams);
        } else {
          this._hotelMap.set(city.id, new Map([
            [sorting, hotelParams],
          ]));
        }
        this._hotelParamsReplaySubject.next(hotelParams);
      });
  }


  public loadHotel(hotelId: string): Observable<IHotel> {
    return this._hotelApiService.loadItemById(hotelId);
  }


  public loadNearestHotels(hotelId: string): Observable<IHotel[]> {
    return this._hotelApiService
      .loadList({
        hotelId,
        sorting: ESortingType.NEARBY,
      })
      .pipe(
        map((hotelList: IHotel[]) => hotelList.slice(0, NEARBY_HOTEL_COUNT))
      );
  }


  public loadFavoriteHotels(): void {
    this._hotelApiService
      .loadList({
        isFavorite: true,
      })
      .subscribe((favoriteHotelList: IHotel[]) => {
        this._favoriteHotelListBehaviorSubject.next(favoriteHotelList);
      });
  }


  public toggleFavoriteStatus(hotelId: string): void {
    this._favoriteApiService
      .toggleFavoriteStatus(hotelId)
      .subscribe((favorite: IFavoriteResponse) => {
        this._updateHotelMaps(favorite.hotelId, {isFavorite: favorite.value});
        this._updateFavoriteHotel(favorite.hotelId, {isFavorite: favorite.value});
      });
  }


  public changeSorting(sorting: ESortingType): void {
    this._sortingBehaviorSubject.next(sorting);
  }


  public _updateHotelMaps(hotelId: string, updatedHotelParams: Partial<IHotel>): void {
    const updatedParamNames = Object.keys(updatedHotelParams);
    this._hotelMap.forEach((cityHotelMaps: Map<ESortingType, IList<IHotel>>) => {
      cityHotelMaps.forEach((sortingHotels: IList<IHotel>) => {
        sortingHotels.list.forEach((hotel: IHotel) => {
          if (hotel.id !== hotelId) {
            return;
          }
          updatedParamNames.forEach((paramName: string) => {
            hotel[paramName] = updatedHotelParams[paramName];
          });
        });
      });
    });
  }


  public _updateFavoriteHotel(hotelId: string, updatedHotelParams: Partial<IHotel>): void {
    const updatedParamNames = Object.keys(updatedHotelParams);
    const favoriteHotel = this._favoriteHotelListBehaviorSubject
      .getValue()
      .find((hotel: IHotel) => hotel.id === hotelId);
    if (!favoriteHotel) {
      return;
    }
    updatedParamNames.forEach((paramName: string) => {
      favoriteHotel[paramName] = updatedHotelParams[paramName];
    });
  }
}
