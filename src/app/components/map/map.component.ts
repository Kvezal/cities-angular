import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';

import {
  ELayer,
  IMapCity,
  IMapMarker,
} from './map.interface';
import { MapService } from './map.service';


@Component({
  selector: `app-map`,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @Input()
  set city(value: IMapCity) {
    if (!value) {
      return;
    }
    this._city = value;
    if (!this._isInit) {
      return;
    }
    this._mapService.removeOldMap();
    this._mapService.createMap(this._city);
  }
  @Input()
  set markers(list: IMapMarker[]) {
    if (!list?.length) {
      return;
    }
    this._markers = list;
    if (!this._isInit) {
      return;
    }
    this._mapService.removeOldMarkers();
    this._mapService.addMarkers(list);
  }


  @Input()
  set activeMarkerId(id: string) {
    this._mapService.setActiveMarker(id);
  }

  constructor(private readonly _mapService: MapService) {}
  @HostBinding(`id`) id = `map`;

  @Input()
  @HostBinding(`style.height`)
  public height = `100%`;


  private _city: IMapCity;

  private _markers: IMapMarker[];

  private _isInit = false;
  get(): IMapCity {
    return this._city;
  }


  ngAfterViewInit(): void {
    this._isInit = true;
    this.city = this._city;
    this._mapService.addLayer(ELayer.OPEN_STREET_MAP);
    this.markers = this._markers;
  }


  ngOnDestroy(): void {
    this._mapService.destroyMap();
  }
}
