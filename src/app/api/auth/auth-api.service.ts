import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { ApiPath } from '../api-path.enum';
import { IApiEntity } from '../interfaces';
import {
  IAuthLoginParams,
  IUserResponse
} from './auth.interface';


@Injectable()
export class AuthApiService implements IApiEntity {
  public readonly basePath = ApiPath.AUTH;


  constructor(private readonly _apiService: ApiService) {
  }


  public login(body: IAuthLoginParams): Observable<void> {
    return this._apiService.post(`${this.basePath}/login`, {body});
  }


  public logout(): Observable<void> {
    return this._apiService.head(`${this.basePath}/logout`);
  }


  public loadAuthUserInfo(): Observable<IUserResponse> {
    return this._apiService.get(`${this.basePath}/decode`);
  }
}
