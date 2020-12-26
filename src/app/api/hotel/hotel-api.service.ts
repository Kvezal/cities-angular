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


  public getItemById(hotelId: string): Observable<IHotel> {
    return this._apiService.get(`${this.basePath}/${hotelId}`);
  }


  public getList(queries?: Partial<IHotelQueries>): Observable<IHotel[]> {
    return this._apiService.get(this.basePath, {
      queries,
    });
  }
}
