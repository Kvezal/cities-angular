import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IHotel } from '@interfaces';

import { ApiService } from '../api.service';
import { ApiPath } from '../api-path.enum';
import { IApiEntity } from '../interfaces';
import { IHotelQueries } from './hotel.interface';


@Injectable()
export class HotelApiService implements IApiEntity {
  public readonly basePath = ApiPath.HOTEL;


  constructor(private readonly _apiService: ApiService) { }


  public loadItemById(hotelId: string): Observable<IHotel> {
    return this._apiService.get(`${this.basePath}/${hotelId}`);
  }


  public loadList(queries: Partial<IHotelQueries> = {}): Observable<IHotel[]> {
    return this._apiService.get(this.basePath, {
      queries,
    });
  }
}
