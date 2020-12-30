import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { LoginPageService } from './login-page.service';
import { HttpErrorResponse } from '@angular/common/http';


const MIN_PASSWORD_LENGTH = 6;

@Component({
  selector: `app-login-page`,
  templateUrl: `./login-page.component.html`,
  styleUrls: [`./login-page.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  public readonly city$ = this._loginPageService.city$;
  public errorMessage: string;

  public readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl(
      ``,
      [
        Validators.required,
        Validators.email,
      ],
    ),
    password: new FormControl(
      ``,
      [
        Validators.required,
        Validators.minLength(MIN_PASSWORD_LENGTH),
      ],
    ),
  });


  constructor(
    private readonly _loginPageService: LoginPageService,
    private readonly _router: Router,
    public readonly changeDetectorRef: ChangeDetectorRef,
  ) { }


  public submit(): void {
    const loginParams = this.loginForm.value;
    this._loginPageService
      .login(loginParams)
      .subscribe({
        next: () => {
          this._router.navigate([`/`]);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error.error.description;
          this.changeDetectorRef.markForCheck();
        },
      });
  }
}
