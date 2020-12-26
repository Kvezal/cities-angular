import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './api.service';
import { AuthApiService } from './auth';
import { CommentApiService } from './comment';
import { FavoriteApiService } from './favorite';
import { HotelApiService } from './hotel';


@NgModule({
  imports: [HttpClientModule],
  providers: [
    ApiService,
    AuthApiService,
    CommentApiService,
    FavoriteApiService,
    HotelApiService,
  ],
})
export class ApiModule {}
