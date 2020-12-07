import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteFlagComponent } from './favorite-flag.component';


@NgModule({
  declarations: [
    FavoriteFlagComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
  ],
})
export class FavoriteFlagModule { }
