import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityPageRoutingModule } from './city-page-routing.module';
import { CityPageComponent } from './city-page.component';


@NgModule({
  declarations: [CityPageComponent],
  imports: [
    CommonModule,
    CityPageRoutingModule
  ]
})
export class CityPageModule { }
