import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject
} from 'rxjs';

import { CityApiService } from '@api';
import { ICity } from '@interfaces';
import {
  distinctUntilChanged,
  filter,
  first,
  map
} from 'rxjs/operators';


@Injectable({
  providedIn: `root`
})
export class CityService {
  private readonly _cityReplaySubject: BehaviorSubject<ICity> = new BehaviorSubject(null);
  public readonly city$: Observable<ICity> = this._cityReplaySubject.asObservable()
    .pipe(
      distinctUntilChanged(),
      filter((city) => city !== null)
    );

  private readonly _cityListReplaySubject: ReplaySubject<ICity[]> = new ReplaySubject(1);
  public readonly cityList$: Observable<ICity[]> = this._cityListReplaySubject.asObservable() as Observable<ICity[]>;


  constructor(private readonly _cityApiService: CityApiService) {
    this._cityApiService
      .loadList()
      .subscribe((cityList: ICity[]) => {
        this._cityListReplaySubject.next(cityList);
        if (this._cityReplaySubject.getValue()) {
          return;
        }
        this._cityReplaySubject.next(cityList[0]);
      });
  }


  public switchCity(cityId: string): void {
    this.cityList$
      .pipe(
        first(),
        map((cityList: ICity[]) =>
          cityList.find((city: ICity) => city.id === cityId)
        )
      )
      .subscribe((city: ICity) =>
        this._cityReplaySubject.next(city)
      );
  }


  public switchCityByName(cityName: string): void {
    this.cityList$
      .pipe(
        first(),
        map((cityList: ICity[]) =>
          cityList.find((city: ICity) => city.title === cityName)
        )
      )
      .subscribe((city: ICity) =>
        this._cityReplaySubject.next(city)
      );
  }
}
