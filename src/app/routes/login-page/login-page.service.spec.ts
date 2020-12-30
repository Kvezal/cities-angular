import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  AuthService,
  CityService
} from '@services';

import { LoginPageService } from './login-page.service';
import { ICity } from '@interfaces';
import { IAuthLoginParams } from '@api';


const city: ICity = {
  id: `023dda52-f07b-47ef-a44c-2301f8743149`,
  title: `Amsterdam`,
  location: {
    id: `0b88066e-c543-451f-b4a0-67c0729335da`,
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 8,
  },
};

const loginFormValue: IAuthLoginParams = {
  email: `test@gmail.com`,
  password: `123456`,
};

describe(`LoginPageService`, () => {
  let service: LoginPageService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginPageService,
        {
          provide: AuthService,
          useValue: {
            login: () => null,
          },
        },
        {
          provide: CityService,
          useValue: {
            city$: of(city),
          },
        }
      ]
    });
    service = TestBed.inject(LoginPageService);
    authService = TestBed.inject(AuthService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  describe(`login`, () => {
    it(`should call`, () => {
      const login = spyOn(authService, `login`);
      service.login(loginFormValue);
      expect(login).toHaveBeenCalledTimes(1);
    });

    it(`should call with params`, () => {
      const login = spyOn(authService, `login`);
      service.login(loginFormValue);
      expect(login).toHaveBeenCalledWith(loginFormValue);
    });
  });

  describe(`city$`, () => {
    it(`should throw CityService.city$`, () => {
      let newCity: ICity;
      service.city$.subscribe((emittedCity: ICity) => {
        newCity = emittedCity;
      });
      expect(newCity).toBe(city);
    });
  });
});
