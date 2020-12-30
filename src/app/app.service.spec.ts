import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { AuthService } from '@services';
import { of } from 'rxjs';
import { IUserResponse } from '@api';
import { IHeaderUser } from '@components';


const user: IUserResponse = {
  id: `023dda52-f07b-47ef-a44c-2301f8743149`,
  name: `kvezal`,
  email: `kvezal@gmail.com`,
  image: `assets/images/test/1.jpg`,
};

const headerUser: IHeaderUser = {
  email: user.email,
  image: user.image,
};

describe('AppService', () => {
  let service: AppService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            user$: of(user),
          },
        },
      ],
    });
    service = TestBed.inject(AppService);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`user$`, () => {
    it(`should emit user$`, () => {
      let newUser: IHeaderUser;
      service.user$.subscribe((emittedUser: IHeaderUser) => {
        newUser = emittedUser;
      });
      expect(newUser).toEqual(headerUser);
    });
  });
});
