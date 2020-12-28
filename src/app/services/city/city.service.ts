import { Injectable } from '@angular/core';
import {
  Observable,
  ReplaySubject
} from 'rxjs';

import { CityApiService } from '@api';
import { ICity } from '@interfaces';
import {
  first,
  map
} from 'rxjs/operators';


@Injectable({
  providedIn: `root`
})
export class CityService {
  private readonly _cityReplaySubject: ReplaySubject<ICity> = new ReplaySubject(1);
  public readonly city$: Observable<ICity> = this._cityReplaySubject.asObservable();

  private readonly _cityListReplaySubject: ReplaySubject<ICity[]> = new ReplaySubject(1);
  public readonly cityList$: Observable<ICity[]> = this._cityListReplaySubject.asObservable() as Observable<ICity[]>;


  constructor(private readonly _cityApiService: CityApiService) {
    this._cityApiService
      .loadList()
      .subscribe((cityList: ICity[]) =>
        this._cityListReplaySubject.next(cityList)
      );
  }


  public switchCity(cityId: string): void {
    this.cityList$
      .pipe(
        first(),
        map((cityList: ICity[]) =>
          cityList.find((city) => city.id === cityId)
        )
      )
      .subscribe((city: ICity) =>
        this._cityReplaySubject.next(city)
      );
  }
}
