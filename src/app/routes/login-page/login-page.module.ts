import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CityLinkModule } from '@components';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { LoginPageService } from './login-page.service';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    CityLinkModule,
  ],
  providers: [
    LoginPageService,
  ]
})
export class LoginPageModule { }
