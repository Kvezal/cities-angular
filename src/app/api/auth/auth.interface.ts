export interface IAuthLoginParams {
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  image: string;
}
