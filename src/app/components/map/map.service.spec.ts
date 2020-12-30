import { TestBed } from '@angular/core/testing';
import {
  Map as LeafletMap,
  Marker,
  TileLayer
} from 'leaflet';

import { MapService } from './map.service';
import { LeafletProviderService } from './leaflet-provider.service';
import {
  ELayer,
  IMapCity,
  IMapMarker
} from './map.interface';
import { LayerMap } from './layer-map';


const mapCity: IMapCity = {
  coords: {
    lat: 52.38333,
    lng: 4.9,
  },
  zoom: 13,
};

const mapMarkers: IMapMarker[] = [
  {
    id: `1`,
    coords: {
      lat: 52.3709553943508,
      lng: 4.89309666406198,
    },
  },
  {
    id: `2`,
    coords: {
      lat: 52.3909553943508,
      lng: 4.85309666406198,
    },
  },
  {
    id: `3`,
    coords: {
      lat: 52.369553943508,
      lng: 4.85309666406198,
    },
  },
  {
    id: `4`,
    coords: {
      lat: 52.3909553943508,
      lng: 4.929309666406198,
    },
  },
  {
    id: `5`,
    coords: {
      lat: 52.3809553943508,
      lng: 4.939309666406198,
    },
  },
];

describe(`MapService`, () => {
  let service: MapService;
  let leafletProviderService: LeafletProviderService;
  let map: LeafletMap;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapService,
        LeafletProviderService,
      ],
    });
    service = TestBed.inject(MapService);
    leafletProviderService = TestBed.inject(LeafletProviderService);

    const mapContainer: HTMLDivElement = document.createElement(`div`);
    map = new LeafletMap(mapContainer);
    leafletProviderService.map = () => map;
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });


  describe(`createMap method`, () => {
    describe(`map method of LeafletProviderService`, () => {
      beforeEach(() => {
        const mapContainer: HTMLDivElement = document.createElement(`div`);
        const mapResult = new LeafletMap(mapContainer);
        spyOn(leafletProviderService, `map`).and.returnValue(mapResult);
        service.createMap(mapCity);
      });

      it(`should call`, () => {
        expect(leafletProviderService.map).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        expect(leafletProviderService.map).toHaveBeenCalledWith(`map`, {
          center: mapCity.coords,
          zoom: mapCity.zoom,
          zoomControl: false,
          layers: [],
        });
      });
    });


    describe(`setView method of LeafletMap`, () => {
      beforeEach(() => {
        spyOn(map, `setView`);
        service.createMap(mapCity);
      });

      it(`should call`, () => {
        expect(map.setView).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        expect(map.setView).toHaveBeenCalledWith(mapCity.coords, mapCity.zoom);
      });
    });

    it(`should set correct map`, () => {
      spyOn(map, `setView`).and.callThrough();
      service.createMap(mapCity);
      expect(service.map).toEqual(map);
    });
  });


  describe(`removeOldMap`, () => {
    describe(`remove method of LeafMap`, () => {
      beforeEach(() => {
        spyOn(map, `remove`);
        service.createMap(mapCity);
        service.removeOldMap();
      });

      it(`should call if map is existed`, () => {
        expect(map.remove).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, () => {
        expect(map.remove).toHaveBeenCalledWith();
      });
    });
  });


  describe(`addLayer`, () => {
    describe(`get of LayerMap`, () => {
      beforeEach(() => {
        spyOn(LayerMap, `get`).and.callThrough();
        service.addLayer(ELayer.OPEN_STREET_MAP);
      });

      it(`should call`, () => {
        expect(LayerMap.get).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        expect(LayerMap.get).toHaveBeenCalledWith(ELayer.OPEN_STREET_MAP);
      });
    });

    describe(`tileLayer method of LeafletProviderService`, () => {
      beforeEach(() => {
        spyOn(leafletProviderService, `tileLayer`).and.callThrough();
        service.addLayer(ELayer.OPEN_STREET_MAP);
      });

      it(`should call`, () => {
        expect(leafletProviderService.tileLayer).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        const layerParams = LayerMap.get(ELayer.OPEN_STREET_MAP);
        expect(leafletProviderService.tileLayer).toHaveBeenCalledWith(layerParams.tile, layerParams.options);
      });
    });

    describe(`layerSet`, () => {
      it(`should be empty`, () => {
        expect(service.layerSet).toHaveSize(0);
      });

      it(`should contain layer`, () => {
        service.addLayer(ELayer.OPEN_STREET_MAP);
        expect(service.layerSet).toHaveSize(1);
      });
    });

    describe(`addTo method of Layer`, () => {
      let tileLayer: TileLayer;

      beforeEach(() => {
        const layerParams = LayerMap.get(ELayer.OPEN_STREET_MAP);
        tileLayer = new TileLayer(layerParams.tile, layerParams.options);
        spyOn(tileLayer, `addTo`);
        leafletProviderService.tileLayer = () => tileLayer;
      });

      describe(`if map is existed`, () => {
        beforeEach(() => {
          service.createMap(mapCity);
          service.addLayer(ELayer.OPEN_STREET_MAP);
        });

        it(`should call`, () => {
          expect(tileLayer.addTo).toHaveBeenCalledTimes(1);
        });

        it(`should call with params`, () => {
          expect(tileLayer.addTo).toHaveBeenCalledWith(map);
        });
      });

      it(`if map isn't existed`, () => {
        service.addLayer(ELayer.OPEN_STREET_MAP);
        expect(tileLayer.addTo).toHaveBeenCalledTimes(0);
      });
    });
  });


  describe(`addMarkers`, () => {
    describe(`createMarker method of MapService`, () => {
      it(`should call`, () => {
        spyOn(service, `createMarker`).and.callThrough();
        service.addMarkers(mapMarkers);
        expect(service.createMarker).toHaveBeenCalledTimes(mapMarkers.length);
      });

      it(`should call with params`, () => {
        const createMarker = spyOn(service, `createMarker`).and.callThrough();
        service.addMarkers(mapMarkers);
        mapMarkers.forEach((marker, index) => {
          expect(createMarker.calls.argsFor(index)).toContain(marker);
        });
      });

      it(`shouldn't call if mapMarkers is empty`, () => {
        spyOn(service, `createMarker`).and.callThrough();
        service.addMarkers([]);
        expect(service.createMarker).toHaveBeenCalledTimes(0);
      });
    });

    describe(`markerMap of MapService`, () => {
      it(`should be empty by default`, () => {
        expect(service.markerMap).toHaveSize(0);
      });

      it(`should have correct marker count`, () => {
        service.addMarkers(mapMarkers);
        expect(service.markerMap).toHaveSize(mapMarkers.length);
      });
    });

    describe(`setActiveMarker of MapService`, () => {
      it(`shouldn't call if activeMarkerId doesn't match with marker id`, () => {
        spyOn(service, `setActiveMarker`);
        service.addMarkers(mapMarkers);
        expect(service.setActiveMarker).toHaveBeenCalledTimes(0);
      });

      it(`should call if activeMarkerId matches with marker id`, () => {
        service.setActiveMarker(mapMarkers[0].id);
        spyOn(service, `setActiveMarker`);
        service.addMarkers(mapMarkers);
        expect(service.setActiveMarker).toHaveBeenCalledTimes(1);
      });
    });

    describe(`addTo of LeafletMap`, () => {
      const mapMarker = mapMarkers[0];
      let marker: Marker;

      beforeEach(() => {
        marker = new Marker(mapMarker.coords);
        spyOn(marker, `addTo`);
        service.createMarker = () => marker;
      });

      it(`should't call if map isn't existed`, () => {
        service.addMarkers(mapMarkers);
        expect(marker.addTo).toHaveBeenCalledTimes(0);
      });

      it(`should call with correct params if map is existed`, () => {
        service.createMap(mapCity);
        service.addMarkers([mapMarker]);
        expect(marker.addTo).toHaveBeenCalledWith(map);
      });
    });
  });


  describe(`createMarker`, () => {
    const mapMarker = mapMarkers[0];

    describe(`marker method of LeafletProviderService`, () => {
      it(`should call`, () => {
        spyOn(leafletProviderService, `marker`).and.callThrough();
        service.createMarker(mapMarker);
        expect(leafletProviderService.marker).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        spyOn(leafletProviderService, `marker`).and.callThrough();
        service.createMarker(mapMarker);
        expect(leafletProviderService.marker).toHaveBeenCalledWith(mapMarker.coords, {
          icon: service.icon,
        });
      });
    });

    it(`should return correct result`, () => {
      const marker = new Marker(mapMarker.coords);
      leafletProviderService.marker = () => marker;
      const result = service.createMarker(mapMarker);
      expect(result).toEqual(marker);
    });
  });


  describe(`setActiveMarker`, () => {
    const mapMarker: IMapMarker = mapMarkers[0];
    const activeMarkerId = mapMarker.id;
    const marker = new Marker(mapMarker.coords);

    describe(`unsetActiveMarker`, () => {
      beforeEach(() => {
        spyOn(service, `unsetActiveMarker`).and.callThrough();
        service.setActiveMarker(activeMarkerId);
      });

      it(`should call`, () => {
        expect(service.unsetActiveMarker).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, () => {
        expect(service.unsetActiveMarker).toHaveBeenCalledWith();
      });
    });

    describe(`get method of markerMap`, () => {
      beforeEach(() => {
        spyOn(service.markerMap, `get`).and.callThrough();
        service.setActiveMarker(activeMarkerId);
      });

      it(`should call`, () => {
        expect(service.markerMap.get).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        expect(service.markerMap.get).toHaveBeenCalledWith(activeMarkerId);
      });
    });

    describe(`setIcon method of Marker`, () => {
      beforeEach(() => {
        service.markerMap.get = () => marker;
        spyOn(marker, `setIcon`).and.callThrough();
        service.setActiveMarker(activeMarkerId);
      });

      it(`should call`, () => {
        expect(marker.setIcon).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        expect(marker.setIcon).toHaveBeenCalledWith(service.activeIcon);
      });
    });

    describe(`setZIndexOffset method of Marker`, () => {
      beforeEach(() => {
        service.markerMap.get = () => marker;
        spyOn(marker, `setZIndexOffset`).and.callThrough();
        service.setActiveMarker(activeMarkerId);
      });

      it(`should call`, () => {
        expect(marker.setZIndexOffset).toHaveBeenCalledTimes(1);
      });

      it(`should call with param`, () => {
        expect(marker.setZIndexOffset).toHaveBeenCalledWith(1000);
      });
    });
  });


  describe(`unsetActiveMarker`, () => {
    it(`should call correct if activeMarkerId isn't existed`, () => {
      service.setActiveMarker(null);
      const result = service.unsetActiveMarker();
      expect(result).toBeUndefined();
    });

    it(`should call correct if markerMap is empty`, () => {
      service.addMarkers([]);
      const result = service.unsetActiveMarker();
      expect(result).toBeUndefined();
    });

    describe(`get method of markerMap`, () => {
      let markerMap: Map<string, Marker>;
      const activeMarkerId = mapMarkers[0].id;

      beforeEach(() => {
        service.setActiveMarker(activeMarkerId);
        service.addMarkers(mapMarkers);
        markerMap = service.markerMap;
        spyOn(markerMap, `get`).and.callThrough();
        service.unsetActiveMarker();
      });

      it(`should call`, () => {
        expect(markerMap.get).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        expect(markerMap.get).toHaveBeenCalledWith(activeMarkerId);
      });
    });

    describe(`setIcon method of marker`, () => {
      const mapMarker: IMapMarker = mapMarkers[0];
      let marker: Marker;

      beforeEach(() => {
        service.setActiveMarker(mapMarker.id);
        service.addMarkers(mapMarkers);
        marker = new Marker(mapMarker.coords);
        const markerMap = service.markerMap;
        markerMap.get = () => marker;
        spyOn(marker, `setIcon`).and.callThrough();
        service.unsetActiveMarker();
      });

      it(`should call`, () => {
        expect(marker.setIcon).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, () => {
        expect(marker.setIcon).toHaveBeenCalledWith(service.icon);
      });
    });

    describe(`setZIndexOffset method of Marker`, () => {
      const mapMarker: IMapMarker = mapMarkers[0];
      let marker: Marker;

      beforeEach(() => {
        service.setActiveMarker(mapMarker.id);
        service.addMarkers(mapMarkers);
        marker = new Marker(mapMarker.coords);
        const markerMap = service.markerMap;
        markerMap.get = () => marker;
        spyOn(marker, `setZIndexOffset`).and.callThrough();
        service.unsetActiveMarker();
      });

      it(`should call`, () => {
        expect(marker.setZIndexOffset).toHaveBeenCalledTimes(1);
      });

      it(`should call with param`, () => {
        expect(marker.setZIndexOffset).toHaveBeenCalledWith(0);
      });
    });
  });
});
