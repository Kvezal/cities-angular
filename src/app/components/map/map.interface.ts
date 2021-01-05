import { LatLngLiteral } from 'leaflet';


export interface IMapLocation extends IMapMarker {
  zoom: number;
}

export enum ELayer {
  OPEN_STREET_MAP = `OpenStreetMap`,
}

export interface IMapMarker {
  id: string;
  coords: LatLngLiteral;
}
