import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CityLinkModule,
  FooterModule,
  HotelCardModule
} from '@components';

import { FavoritePageRoutingModule } from './favorite-page-routing.module';
import { FavoritePageComponent } from './favorite-page.component';
import { FavoritePageService } from './favorite-page.service';


@NgModule({
  declarations: [
    FavoritePageComponent,
  ],
  imports: [
    CommonModule,
    FavoritePageRoutingModule,
    CityLinkModule,
    FooterModule,
    HotelCardModule,
  ],
  providers: [
    FavoritePageService,
  ],
})
export class FavoritePageModule { }
