import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './api.service';
import { AuthApiService } from './auth';
import { CommentApiService } from './comment';
import { FavoriteApiService } from './favorite';
import { HotelApiService } from './hotel';
import { CityApiService } from './city/city-api.service';


@NgModule({
  imports: [HttpClientModule],
  providers: [
    ApiService,
    AuthApiService,
    CityApiService,
    CommentApiService,
    FavoriteApiService,
    HotelApiService,
  ],
})
export class ApiModule {}
