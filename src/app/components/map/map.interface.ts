import { LatLngLiteral } from 'leaflet';


export interface IMapCity {
  coords: LatLngLiteral;
  zoom: number;
}

export enum ELayer {
  OPEN_STREET_MAP = `OpenStreetMap`,
}

export interface IMapMarker {
  id: string;
  coords: LatLngLiteral;
}
