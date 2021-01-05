import { Injectable } from '@angular/core';
import {
  combineLatest,
  Observable
} from 'rxjs';
import {
  filter,
  first,
  map
} from 'rxjs/operators';

import {
  ICommentParams,
  IUserResponse
} from '@api';
import {
  IMapLocation,
  IMapMarker
} from '@components';
import {
  IHotel,
  ILocation
} from '@interfaces';
import {
  AuthService,
  CommentService,
  HotelService
} from '@services';

import { IOfferPageParams } from './offer-page.interface';


@Injectable()
export class OfferPageService {
  public location$: Observable<IMapLocation> = this._hotelService
    .hotel$
    .pipe(
      filter(Boolean),
      map((hotel: IHotel) => this._convertHotelLocationToMapLocation(hotel.location))
    );

  public markerList$: Observable<IMapMarker[]> = this._hotelService
    .nearestHotelList$
    .pipe(
      map((hotelList: IHotel[]) => hotelList.map((hotel: IHotel) =>
        this._convertHotelLocationToMapMarker(hotel.location))
      )
    );

  public isAuthorized$: Observable<boolean> = this._authService
    .user$
    .pipe(
      first(),
      map((user: IUserResponse) => user !== null)
    );


  public pageParams$: Observable<IOfferPageParams> = combineLatest([
    this.isAuthorized$,
    this._hotelService.hotel$,
    this._hotelService.nearestHotelList$,
    this.location$,
    this.markerList$,
    this._commentService.commentList$,
  ]).pipe(
    map(([
      isAuthorized,
      hotel,
      nearestHotelList,
      location,
      markerList,
      commentList
    ]) => ({
      isAuthorized,
      hotel,
      nearestHotelList,
      location,
      markers: [
        ...markerList,
        {
          id: location.id,
          coords: location.coords,
        },
      ],
      commentList,
    }))
  );

  constructor(
    private readonly _authService: AuthService,
    private readonly _hotelService: HotelService,
    private readonly _commentService: CommentService
  ) {
  }


  public loadContent(hotelId: string): void {
    this._hotelService.loadHotel(hotelId);
    this._hotelService.loadNearestHotels(hotelId);
    this._commentService.loadList(hotelId);
  }


  public toggleFavoriteStatus(hotelId: string): void {
    this._hotelService.toggleFavoriteStatus(hotelId);
  }


  public createComment(params: ICommentParams): void {
    this._commentService.create(params);
  }


  private _convertHotelLocationToMapLocation(location: ILocation): IMapLocation {
    return {
      id: location.id,
      zoom: location.zoom,
      coords: {
        lat: location.latitude,
        lng: location.longitude,
      },
    };
  }

  private _convertHotelLocationToMapMarker(location: ILocation): IMapMarker {
    return {
      id: location.id,
      coords: {
        lat: location.latitude,
        lng: location.longitude,
      },
    };
  }
}
