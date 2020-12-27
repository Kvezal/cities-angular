import { EFavoriteFlagType } from '../favorite-flag';
import { EHotelCardType } from './hotel-card.interface';


export const hotelCardTypeToFavoriteFlagTypeMap = new Map([
  [EHotelCardType.MIDDLE, EFavoriteFlagType.SMALL_SKEW],
  [EHotelCardType.SMALL, EFavoriteFlagType.MIDDLE]
]);
