import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUserResponse } from '@api';
import { IHeaderUser } from '@components';
import { AuthService } from '@services';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  public user$: Observable<IHeaderUser> = this._authService
    .user$
    .pipe(
      map((user: IUserResponse) => {
        if (!user) {
          return null;
        }
        return {
          email: user.email,
          image: user.image,
        };
      })
    );

  constructor(private readonly _authService: AuthService) {
  }
}
