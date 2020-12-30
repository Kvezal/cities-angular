import { Injectable } from '@angular/core';
import {
  Observable,
  ReplaySubject
} from 'rxjs';
import {
  catchError,
  switchMap
} from 'rxjs/operators';

import {
  AuthApiService,
  IAuthLoginParams,
  IUserResponse
} from '@api';


@Injectable({
  providedIn: `root`
})
export class AuthService {
  private readonly _userReplaySubject: ReplaySubject<IUserResponse> = new ReplaySubject(1);
  public readonly user$: Observable<IUserResponse> = this._userReplaySubject.asObservable();


  constructor(private readonly _authApiService: AuthApiService) {
    this.loadUserInfo();
  }


  public loadUserInfo(): void {
    this._authApiService.loadAuthUserInfo()
      .subscribe({
        next: (user: IUserResponse) => {
          this._userReplaySubject.next(user);
        },
        error: () => {
          this._userReplaySubject.next(null);
        }
      });
  }


  public login(params: IAuthLoginParams): void {
    this._authApiService.login(params)
      .pipe(
        switchMap(() => this._authApiService.loadAuthUserInfo())
      )
      .subscribe((user: IUserResponse) => this._userReplaySubject.next(user));
  }


  public logout(): void {
    this._authApiService.logout()
      .subscribe(() => this._userReplaySubject.next(null));
  }
}
