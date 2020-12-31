import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { IHotel } from '@interfaces';
import { HotelService } from '@services';
import { IFavoriteLocation } from './favorite-page.interface';
import { Observable } from 'rxjs';


@Injectable()
export class FavoritePageService {
  public locationList$: Observable<IFavoriteLocation[]> = this._hotelService
    .favoriteHotelList$
    .pipe(
      map((hotelsList: IHotel[]) => this._convertToLocationList(hotelsList))
    );


  constructor(private readonly _hotelService: HotelService) {
    this._hotelService.loadFavoriteHotels();
  }


  public toggleFavoriteStatus(hotelId: string): void {
    this._hotelService.toggleFavoriteStatus(hotelId, false);
  }


  public removeNotFavoriteHotelsFromFavoriteList(): void {
    this._hotelService.removeNotFavoriteHotelsFromFavoriteList();
  }


  private _convertToLocationList(hotelsList: IHotel[]): IFavoriteLocation[] {
    const locationMap: Map<string, IHotel[]> = hotelsList
      .reduce((acc: Map<string, IHotel[]>, hotel: IHotel) => {
        let location = acc.get(hotel.city.title);
        if (location) {
          location.push(hotel);
        } else {
          location = [hotel];
          acc.set(hotel.city.title, location);
        }
        return acc;
      }, new Map([]));
    const locationList: IFavoriteLocation[] = Array.from(locationMap).reduce((acc, [city, list]) => {
      acc.push({
        city,
        list,
      });
      return acc;
    }, []);
    return locationList.length === 0 ? null : locationList;
  }
}
