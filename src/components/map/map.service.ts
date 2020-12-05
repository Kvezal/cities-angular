import {Injectable} from '@angular/core';

import {
  ELayer,
  IMapCity,
  IMapMarker,
} from './map.interface';
import { Icon, Map as LeafletMap, Layer, Marker } from 'leaflet';
import { LeafletService } from './leaflet.service';


const LayerMap = new Map([
  [ELayer.OPEN_STREET_MAP, {
    tile: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
    options: {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }
  }]
]);


@Injectable()
export class MapService {
  private _map: LeafletMap;
  private _layerSet: Set<Layer> = new Set([]);
  private readonly _icon: Icon;
  private readonly _activeIcon: Icon;
  private _markerMap: Map<string, Marker> = new Map([]);
  private _activeMarkerId: string;


  constructor(private readonly _leafletService: LeafletService) {
    this._icon = this._leafletService.icon({
      iconUrl: `assets/images/icons/pin.svg`,
      iconSize: [27, 39]
    });
    this._activeIcon = this._leafletService.icon({
      iconUrl: `assets/images/icons/pin-active.svg`,
      iconSize: [27, 39]
    });
  }


  public createMap(city: IMapCity): void {
    this._map = this._leafletService
      .map(`map`, {
        center: city.coords,
        zoom: city.zoom,
        zoomControl: false,
        layers: Array.from(this._layerSet.values()),
      })
      .setView(city.coords, city.zoom);
  }


  public removeOldMap(): void {
    if (this._map) {
      this._map = this._map.remove();
    }
  }


  public addLayer(layerName: ELayer): void {
    const layerSettings = LayerMap.get(layerName);
    const layer: Layer = this._leafletService.tileLayer(layerSettings.tile, layerSettings.options);
    this._layerSet.add(layer);
    if (this._map) {
      layer.addTo(this._map);
    }
  }


  public addMarkers(markersCoords: IMapMarker[]): void {
    markersCoords.forEach((markerCoords: IMapMarker) => {
      if (this._markerMap.has(markerCoords.id)) {
        return;
      }
      const marker: Marker = this._createMarker(markerCoords);
      this._markerMap.set(markerCoords.id, marker);
      if (markerCoords.id === this._activeMarkerId) {
        this.setActiveMarker(markerCoords.id);
      }
      if (this._map) {
        marker.addTo(this._map);
      }
    });
  }


  private _createMarker(markerCoords: IMapMarker): Marker {
    return this._leafletService.marker(markerCoords.coords, {
      icon: this._icon,
    });
  }


  public setActiveMarker(id: string): void {
    this.unsetActiveMarker();
    this._activeMarkerId = id;
    const marker = this._markerMap.get(id);
    if (marker) {
      marker.setIcon(this._activeIcon);
    }
  }


  public unsetActiveMarker(): void {
    if (!this._activeMarkerId) {
      return;
    }
    console.log(this._activeMarkerId);
    const activeMarker = this._markerMap.get(this._activeMarkerId);
    activeMarker.setIcon(this._icon);
  }
}
