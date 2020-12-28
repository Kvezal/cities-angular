import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferPageRoutingModule } from './offer-page-routing.module';
import { OfferPageComponent } from './offer-page.component';


@NgModule({
  declarations: [OfferPageComponent],
  imports: [
    CommonModule,
    OfferPageRoutingModule
  ]
})
export class OfferPageModule { }
