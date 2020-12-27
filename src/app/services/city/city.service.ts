import { Injectable } from '@angular/core';
import {
  Observable,
  ReplaySubject
} from 'rxjs';

import { CityApiService } from '@api';
import { ICity } from '@interfaces';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly _cityListReplaySubject: ReplaySubject<ICity[]> = new ReplaySubject(1);
  public cityList$: Observable<ICity[]> = this._cityListReplaySubject.asObservable() as Observable<ICity[]>;


  constructor(private readonly _cityApiService: CityApiService) {
    this._cityApiService.loadList().subscribe((cityList: ICity[]) => this._cityListReplaySubject.next(cityList));
  }
}
