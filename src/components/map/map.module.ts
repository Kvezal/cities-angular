import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { LeafletProviderService } from './leaflet-provider.service';


@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    LeafletProviderService,
    MapService,
  ],
  exports: [
    MapComponent,
  ],
})
export class MapModule { }
