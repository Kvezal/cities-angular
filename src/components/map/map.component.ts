import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import {
  ELayer,
  IMapCity,
  IMapMarker,
} from './map.interface';
import { MapService } from './map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit  {
  private _city: IMapCity;


  @Input()
  set city(value: IMapCity) {
    if (!value) {
      return;
    }
    this._city = value;
    this._mapService.removeOldMap();
    this._mapService.createMap(this._city);
  }
  get(): IMapCity {
    return this._city;
  }


  @Input()
  set markers(list: IMapMarker[]) {
    if (!list?.length) {
      return;
    }
    this._mapService.addMarkers(list);
  }


  @Input()
  set activeMarkerId(id: string) {
    this._mapService.setActiveMarker(id);
  }


  constructor(private readonly _mapService: MapService) {}


  ngOnInit(): void {
    this._mapService.addLayer(ELayer.OPEN_STREET_MAP);
  }
}
