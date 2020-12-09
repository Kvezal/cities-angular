import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelCardComponent } from './hotel-card.component';
import { FavoriteFlagModule } from "../favorite-flag";
import { RatingModule } from "../rating";


@NgModule({
  declarations: [
    HotelCardComponent,
  ],
  imports: [
    CommonModule,
    FavoriteFlagModule,
    RatingModule,
  ],
  exports: [
    HotelCardComponent,
  ],
})
export class HotelCardModule { }
