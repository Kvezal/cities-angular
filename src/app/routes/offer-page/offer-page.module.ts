import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FavoriteFlagModule,
  GalleryModule,
  HotelCardModule,
  MapModule,
  RatingModule
} from '@components';

import { OfferPageRoutingModule } from './offer-page-routing.module';
import { OfferPageComponent } from './offer-page.component';
import { OfferPageService } from './offer-page.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OfferPageComponent,
  ],
  imports: [
    CommonModule,
    OfferPageRoutingModule,
    HotelCardModule,
    RatingModule,
    FavoriteFlagModule,
    MapModule,
    ReactiveFormsModule,
    GalleryModule,
  ],
  providers: [
    OfferPageService,
  ]
})
export class OfferPageModule { }
