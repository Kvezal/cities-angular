import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { LeafletService } from './leaflet.service';


@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    LeafletService,
    MapService,
  ],
  exports: [
    MapComponent,
  ],
})
export class MapModule { }
