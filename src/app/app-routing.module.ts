import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import {
  IsAuthorizedGuard,
  IsUnauthorizedGuard
} from '@guards';


const routes: Routes = [
  {
    path: ``,
    loadChildren: () => import(`./routes/city-page/city-page.module`).then(module => module.CityPageModule),
  },
  {
    path: `offer`,
    loadChildren: () => import(`./routes/offer-page/offer-page.module`).then(module => module.OfferPageModule),
  },
  {
    path: `favorite`,
    loadChildren: () => import(`./routes/favorite-page/favorite-page.module`).then(module => module.FavoritePageModule),
    canActivate: [IsAuthorizedGuard],
  },
  {
    path: `login`,
    loadChildren: () => import(`./routes/login-page/login-page.module`).then(module => module.LoginPageModule),
    canActivate: [IsUnauthorizedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'corrected'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
