import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  IAuthLoginParams,
  IUserResponse
} from '@api';
import { ICity } from '@interfaces';
import {
  AuthService,
  CityService
} from '@services';


@Injectable()
export class LoginPageService {
  public readonly city$: Observable<ICity> = this._cityService.city$;


  constructor(
    private readonly _authService: AuthService,
    private readonly _cityService: CityService,
  ) {
  }


  public login(loginParams: IAuthLoginParams): Observable<IUserResponse> {
    return this._authService.login(loginParams);
  }
}
