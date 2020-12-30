import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAuthLoginParams } from '@api';
import { CityLinkModule } from '@components';
import { ICity } from '@interfaces';

import { LoginPageComponent } from './login-page.component';
import { LoginPageService } from './login-page.service';


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

describe(`LoginPageComponent`, () => {
  let component: LoginPageComponent;
  let loginPageService: LoginPageService;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: '', component: LoginPageComponent},
        ]),
        ReactiveFormsModule,
        CityLinkModule,
      ],
      declarations: [
        LoginPageComponent,
      ],
      providers: [
        {
          provide: LoginPageService,
          useValue: {
            city$: of(city),
            login: () => of(),
          },
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    loginPageService = TestBed.inject(LoginPageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it(`should create`, () => {
    expect(component).toBeTruthy();
  });


  describe(`submit`, () => {
    it(`should call when form correct value form submit`, () => {
      const submit = spyOn(component, `submit`).and.callThrough();
      const submitButton = fixture.nativeElement.querySelector(`button[type=submit]`);
      component.loginForm.setValue(loginFormValue);
      component.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      submitButton.click();
      expect(submit).toHaveBeenCalledTimes(1);
    });

    it(`should call login method of LoginFormService`, () => {
      const login = spyOn(loginPageService, `login`).and.callThrough();
      const submitButton = fixture.nativeElement.querySelector(`button[type=submit]`);
      component.loginForm.setValue(loginFormValue);
      component.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      submitButton.click();
      expect(login).toHaveBeenCalledTimes(1);
    });

    it(`should call login method of LoginFormService with params`, () => {
      const login = spyOn(loginPageService, `login`).and.callThrough();
      const submitButton = fixture.nativeElement.querySelector(`button[type=submit]`);
      component.loginForm.setValue(loginFormValue);
      component.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      submitButton.click();
      expect(login).toHaveBeenCalledWith(loginFormValue);
    });
  });


  describe(`form validity`, () => {
    it(`should be invalid if email field is empty`, () => {
      component.loginForm.setValue({
        ...loginFormValue,
        email: ``,
      });
      component.changeDetectorRef.markForCheck();
      expect(component.loginForm.invalid).toBeTrue();
    });

    it(`should be invalid if email field doesn't contain email`, () => {
      component.loginForm.setValue({
        ...loginFormValue,
        email: `test`,
      });
      component.changeDetectorRef.markForCheck();
      expect(component.loginForm.invalid).toBeTrue();
    });

    it(`should be invalid if password field contain to less then 6`, () => {
      component.loginForm.setValue({
        ...loginFormValue,
        password: `12345`,
      });
      component.changeDetectorRef.markForCheck();
      expect(component.loginForm.invalid).toBeTrue();
    });

    it(`should be valid if form fields contain correct values`, () => {
      component.loginForm.setValue(loginFormValue);
      component.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      expect(component.loginForm.valid).toBeTrue();
    });
  });

  describe(`city$`, () => {
    it(`should set city title in location link`, () => {
      const cityLink = fixture.nativeElement.querySelector(`app-city-link`);
      expect(cityLink.textContent.trim()).toBe(city.title);
    });
  });
});
