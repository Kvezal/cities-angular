import {
  IMapLocation,
  IMapMarker
} from '@components';
import {
  IComment,
  IHotel
} from '@interfaces';


export interface IOfferPageParams {
  isAuthorized: boolean;
  hotel: IHotel;
  nearestHotelList: IHotel[];
  location: IMapLocation;
  markers: IMapMarker[];
  commentList: IComment[];
}
