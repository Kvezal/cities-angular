import {Injectable} from '@angular/core';

import {
  ELayer,
  IMapCity,
  IMapMarker,
} from './map.interface';
import { Icon, Map as LeafletMap, Layer, Marker } from 'leaflet';
import { LeafletProviderService } from './leaflet-provider.service';
import { LayerMap } from './layer-map';


@Injectable()
export class MapService {
  private _map: LeafletMap;
  private _layerSet: Set<Layer> = new Set([]);
  private readonly _icon: Icon;
  private readonly _activeIcon: Icon;
  private _markerMap: Map<string, Marker> = new Map([]);
  private _activeMarkerId: string;

  get map(): LeafletMap {
    return this._map;
  }

  get layerSet(): Set<Layer> {
    return this._layerSet;
  }

  get markerMap(): Map<string, Marker> {
    return this._markerMap;
  }

  get icon(): Icon {
    return this._icon;
  }

  get activeIcon(): Icon {
    return this._activeIcon;
  }


  constructor(private readonly _leafletService: LeafletProviderService) {
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


  public addMarkers(mapMarkers: IMapMarker[]): void {
    mapMarkers.forEach((mapMarker: IMapMarker) => {
      if (this._markerMap.has(mapMarker.id)) {
        return;
      }
      const marker: Marker = this.createMarker(mapMarker);
      this._markerMap.set(mapMarker.id, marker);
      if (mapMarker.id === this._activeMarkerId) {
        this.setActiveMarker(mapMarker.id);
      }
      if (this._map) {
        marker.addTo(this._map);
      }
    });
  }


  public createMarker(mapMarkers: IMapMarker): Marker {
    return this._leafletService.marker(mapMarkers.coords, {
      icon: this.icon,
    });
  }


  public setActiveMarker(id: string): void {
    this.unsetActiveMarker();
    this._activeMarkerId = id;
    const marker = this._markerMap.get(id);
    if (marker) {
      marker.setIcon(this.activeIcon);
    }
  }


  public unsetActiveMarker(): void {
    if (!this._activeMarkerId || this._markerMap.size === 0) {
      return;
    }
    const activeMarker = this._markerMap.get(this._activeMarkerId);
    activeMarker.setIcon(this.icon);
  }
}
