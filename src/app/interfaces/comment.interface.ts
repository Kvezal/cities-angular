import { IUser } from './user.interface';


export interface IComment {
  id: string;
  createdAt: string;
  rating: number;
  text: string;
  user: IUser;
}
