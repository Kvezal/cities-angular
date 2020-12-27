import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICity } from '@interfaces';

import { ApiPath } from '../api-path.enum';
import { ApiService } from '../api.service';
import { IApiEntity } from '../interfaces';


@Injectable()
export class CityApiService implements IApiEntity {
  public readonly basePath = ApiPath.CITY;


  constructor(private readonly _apiService: ApiService) { }


  public loadList(): Observable<ICity[]> {
    return this._apiService.get(this.basePath);
  }
}
