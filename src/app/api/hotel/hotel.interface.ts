export enum ESortingType {
  POPULAR = `popular`,
  RATING = `rating`,
  HIGH_PRICE = `high-price`,
  LOW_PRICE = `low-price`,
  NEARBY = `nearby`,
}

export interface IHotelQueries {
  cityId: string;
  hotelId: string;
  sorting: ESortingType;
  isFavorite: boolean;
}
