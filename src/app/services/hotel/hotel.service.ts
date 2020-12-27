import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject
} from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ESortingType,
  HotelApiService
} from '@api';
import { IHotel } from '@interfaces';


const NEARBY_HOTEL_COUNT = 3;

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private _hotelMap: Map<string, Map<ESortingType, IHotel[]>> = new Map([]);

  private _hotelListReplaySubject: ReplaySubject<IHotel[]> = new ReplaySubject(1);
  public hotelList$: Observable<IHotel[]> = this._hotelListReplaySubject.asObservable();

  private _sortingBehaviorSubject: BehaviorSubject<ESortingType> = new BehaviorSubject(ESortingType.POPULAR);
  public sorting$: Observable<ESortingType> = this._sortingBehaviorSubject.asObservable();


  constructor(private readonly _hotelApiService: HotelApiService) { }


  public updateList(cityId: string, sorting: ESortingType): void {
    const hotelList: IHotel[] = this._hotelMap.get(cityId)?.get(sorting);
    if (hotelList) {
      this._hotelListReplaySubject.next(hotelList);
    } else {
      this._loadHotelList(cityId, sorting);
    }
    this._sortingBehaviorSubject.next(sorting);
  }


  private _loadHotelList(cityId: string, sorting: ESortingType): void {
    this._hotelApiService.loadList({
      cityId,
      sorting,
    }).subscribe((hotelList: IHotel[]) => {
      const cityHotelMap = this._hotelMap.get(cityId);
      if (cityHotelMap) {
        cityHotelMap.set(sorting, hotelList);
      } else {
        this._hotelMap.set(cityId, new Map([
          [sorting, hotelList],
        ]));
      }
      this._hotelListReplaySubject.next(hotelList);
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
}
