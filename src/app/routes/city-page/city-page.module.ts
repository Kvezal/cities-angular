import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HotelCardModule,
  MapModule,
  MenuModule,
  SelectModule
} from '@components';

import { CityPageRoutingModule } from './city-page-routing.module';
import { CityPageComponent } from './city-page.component';
import { CityPageService } from './city-page.service';


@NgModule({
  declarations: [CityPageComponent],
  imports: [
    CommonModule,
    CityPageRoutingModule,
    MenuModule,
    SelectModule,
    MapModule,
    HotelCardModule
  ],
  providers: [CityPageService]
})
export class CityPageModule { }
