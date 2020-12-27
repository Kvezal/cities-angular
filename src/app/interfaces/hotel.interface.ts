import { ICity } from './city.interface';
import { ILocation } from './location.interface';
import { IUser } from './user.interface';


export interface IHotel {
  id: string;
  title: string;
  description: string;
  type: string;
  rating: number;
  bedroomCount: number;
  maxAdultCount: number;
  price: number;
  features: string[];
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  city: ICity;
  location: ILocation;
  host: IUser;
}
