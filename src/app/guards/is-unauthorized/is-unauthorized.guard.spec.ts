import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { IUserResponse } from '@api';
import { AuthService } from '@services';

import { IsUnauthorizedGuard } from './is-unauthorized.guard';


const user: IUserResponse = {
  id: `023dda52-f07b-47ef-a44c-2301f8743149`,
  name: `kvezal`,
  email: `kvezal@gmail.com`,
  image: `assets/images/test/1.jpg`,
};

describe('IsUnauthorizedGuard', () => {
  let guard: IsUnauthorizedGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            user$: of(null),
          },
        },
        {
          provide: Router,
          useValue: {
            createUrlTree: () => null,
          }
        }
      ]
    });
    guard = TestBed.inject(IsUnauthorizedGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it(`should return true if user is unauthorized`, () => {
    let result = false;
    guard.canActivate(null, null)
      .subscribe((isAuthorized: boolean) => {
        result = isAuthorized;
      });
    expect(result).toBeTrue();
  });

  it(`should call createUrlTree of Router instance if user is authorized`, () => {
    const createUrlTree = spyOn(router, `createUrlTree`);
    authService.user$ = of(user);
    guard.canActivate(null, null).subscribe();
    expect(createUrlTree).toHaveBeenCalledTimes(1);
  });
});
