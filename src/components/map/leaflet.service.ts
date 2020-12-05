import { Injectable } from '@angular/core';

import * as Leaflet from 'leaflet';
import {
  Icon,
  IconOptions,
  Map as LeafletMap,
  MapOptions,
  TileLayer,
  TileLayerOptions,
  LatLngExpression,
  Marker,
  MarkerOptions,
} from 'leaflet';


@Injectable()
export class LeafletService {
  public icon(options: IconOptions): Icon {
    return Leaflet.icon(options);
  }

  public map(name: string, options: MapOptions): LeafletMap {
    return Leaflet.map(name, options);
  }

  public tileLayer(name: string, options: TileLayerOptions): TileLayer {
    return Leaflet.tileLayer(name, options);
  }

  public marker(coords: LatLngExpression, options: MarkerOptions): Marker {
    return Leaflet.marker(coords, options);
  }
}
