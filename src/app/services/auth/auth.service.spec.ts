import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  ApiModule,
  AuthApiService,
  IAuthLoginParams,
  IUserResponse
} from '@api';

import { AuthService } from './auth.service';


const userInfo: IUserResponse = {
  id: `023dda52-f07b-47ef-a44c-2301f8743149`,
  name: `kvezal`,
  email: `kvezal@gmail.com`,
  image: `assets/images/test/1.jpg`,
};

const authLoginParams: IAuthLoginParams = {
  email: `test@gmail.com`,
  password: `123456`,
};

describe(`AuthService`, () => {
  let service: AuthService;
  let authApiService: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [
        {
          provide: AuthApiService,
          useValue: {
            login: () => of(undefined),
            logout: () => of(undefined),
            loadAuthUserInfo: () => of(userInfo),
          }
        }
      ],
    });
    service = TestBed.inject(AuthService);
    authApiService = TestBed.inject(AuthApiService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  describe(`loadUserInfo`, () => {
    it(`should call loadAuthUserInfo method of AuthApiService`, () => {
      const loadAuthUserInfo = spyOn(authApiService, `loadAuthUserInfo`).and.callThrough();
      service.loadUserInfo();
      expect(loadAuthUserInfo).toHaveBeenCalledTimes(1);
    });

    it(`should emit user$ observable`, () => {
      let user: IUserResponse;
      service.user$.subscribe((userInfoResponse: IUserResponse) => {
        user = userInfoResponse;
      });
      service.loadUserInfo();
      expect(user).toEqual(userInfo);
    });
  });

  describe(`login`, () => {
    it(`should call login method of AuthApiService`, () => {
      const login = spyOn(authApiService, `login`).and.callThrough();
      service.login(authLoginParams);
      expect(login).toHaveBeenCalledTimes(1);
    });

    it(`should call login method of AuthApiService with params`, () => {
      const login = spyOn(authApiService, `login`).and.callThrough();
      service.login(authLoginParams);
      expect(login).toHaveBeenCalledWith(authLoginParams);
    });

    it(`should call loadAuthUserInfo method of AuthApiService`, () => {
      const loadAuthUserInfo = spyOn(authApiService, `loadAuthUserInfo`).and.callThrough();
      service.login(authLoginParams);
      expect(loadAuthUserInfo).toHaveBeenCalledTimes(1);
    });

    it(`should emit user$ observable`, () => {
      let user: IUserResponse;
      service.user$.subscribe((userInfoResponse: IUserResponse) => {
        user = userInfoResponse;
      });
      service.login(authLoginParams);
      expect(user).toEqual(userInfo);
    });
  });

  describe(`logout`, () => {
    it(`should call logout method of AuthApiService`, () => {
      const logout = spyOn(authApiService, `logout`).and.callThrough();
      service.logout();
      expect(logout).toHaveBeenCalledTimes(1);
    });

    it(`should emit null from user$ observable`, () => {
      let user: IUserResponse;
      service.user$.subscribe((userInfoResponse: IUserResponse) => {
        user = userInfoResponse;
      });
      service.logout();
      expect(user).toBeNull();
    });
  });
});
