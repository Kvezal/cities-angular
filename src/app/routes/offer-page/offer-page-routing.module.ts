import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { OfferPageComponent } from './offer-page.component';


const routes: Routes = [
  {
    path: ``,
    component: OfferPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferPageRoutingModule { }
