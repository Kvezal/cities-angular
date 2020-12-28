import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { CityPageComponent } from './city-page.component';


const routes: Routes = [
  {
    path: ``,
    component: CityPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityPageRoutingModule {
}
