import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  first,
  map
} from 'rxjs/operators';

import { IUserResponse } from '@api';
import { AuthService } from '@services';


@Injectable({
  providedIn: `root`,
})
export class IsUnauthorizedGuard implements CanActivate {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this._authService
      .user$
      .pipe(
        first(),
        map((user: IUserResponse) => !user || this._router.createUrlTree([`/`])),
      );
  }


}
