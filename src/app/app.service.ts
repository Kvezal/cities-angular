import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IHeaderUser } from '@components';
import { AuthService } from '@services';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  public user$: Observable<IHeaderUser> = this._authService
    .user$
    .pipe(
      map((userInfo) => ({
        email: userInfo.email,
        image: userInfo.image,
      }))
    );

  constructor(private readonly _authService: AuthService) {
  }
}
