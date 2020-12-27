import { ELayer } from './map.interface';


export const LayerMap = new Map([
  [ELayer.OPEN_STREET_MAP, {
    tile: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
    options: {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }
  }]
]);
