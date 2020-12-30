import { TestBed } from '@angular/core/testing';

import { AuthApiService } from './auth-api.service';
import { ApiModule } from '../api.module';
import { ApiService } from '../api.service';
import { of } from 'rxjs';
import { ApiPath } from '../api-path.enum';
import {
  IAuthLoginParams,
  IUserResponse,
} from './auth.interface';


const authLoginParams: IAuthLoginParams = {
  email: `test@gmail.com`,
  password: `123456`,
};

const userInfo: IUserResponse = {
  id: `023dda52-f07b-47ef-a44c-2301f8743149`,
  name: `kvezal`,
  email: `kvezal@gmail.com`,
  image: `assets/images/test/1.jpg`,
};

describe(`AuthApiService`, () => {
  let service: AuthApiService;
  let apiService: ApiService;
  const basePath = ApiPath.AUTH;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [
        {
          provide: ApiService,
          useValue: {
            get: () => of(),
            post: () => of(),
            head: () => of(),
          },
        },
      ],
    });
    service = TestBed.inject(AuthApiService);
    apiService = TestBed.inject(ApiService);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  describe(`login`, () => {
    beforeEach(() => {
      spyOn(apiService, `post`);
      service.login(authLoginParams);
    });

    it(`should call post method of ApiService`, () => {
      expect(apiService.post).toHaveBeenCalledTimes(1);
    });

    it(`should call post method of ApiService with params`, () => {
      expect(apiService.post).toHaveBeenCalledWith(`${basePath}/login`, {
        body: authLoginParams,
      });
    });
  });

  describe(`logout`, () => {
    beforeEach(() => {
      spyOn(apiService, `head`);
      service.logout();
    });

    it(`should call head method of ApiService`, () => {
      expect(apiService.head).toHaveBeenCalledTimes(1);
    });

    it(`should call head method of ApiService with params`, () => {
      expect(apiService.head).toHaveBeenCalledWith(`${basePath}/logout`);
    });
  });

  describe(`decode`, () => {
    beforeEach(() => {
      spyOn(apiService, `get`).and.returnValue(of(userInfo));
      service.loadAuthUserInfo();
    });

    it(`should call get method of ApiService`, () => {
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it(`should call get method of ApiService with params`, () => {
      expect(apiService.get).toHaveBeenCalledWith(`${basePath}/decode`);
    });
  });
});
