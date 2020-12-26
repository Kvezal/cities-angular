import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiPath } from '../api-path.enum';
import { ApiService } from '../api.service';
import { IFavoriteResponse } from './favorite-api.interface';
import { IApiEntity } from '../interfaces';


@Injectable()
export class FavoriteApiService implements IApiEntity {
  public readonly basePath = ApiPath.FAVORITE;


  constructor(private readonly _apiService: ApiService) {
  }


  public toggleFavoriteStatus(hotelId: string): Observable<IFavoriteResponse> {
    return this._apiService.post(this.basePath, {
      queries: {hotelId}
    });
  }
}
