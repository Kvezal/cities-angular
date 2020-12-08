import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityLinkComponent } from './city-link.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CityLinkComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CityLinkComponent,
  ],
})
export class CityLinkModule { }
