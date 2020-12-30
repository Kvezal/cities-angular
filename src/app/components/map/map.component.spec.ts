import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { MapService } from './map.service';
import {
  IMapCity,
  IMapMarker
} from './map.interface';
import { LeafletProviderService } from './leaflet-provider.service';


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


describe(`MapComponent`, () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let service: MapService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MapComponent,
      ],
      providers: [
        LeafletProviderService,
        MapService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MapService);
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`city`, () => {
    describe(`removeOldMap method of MapService`, () => {
      it(`shouldn't call if city is empty`, () => {
        const removeOldMap = spyOn(service, `removeOldMap`);
        expect(removeOldMap).toHaveBeenCalledTimes(0);
      });

      it(`should call if city isn't empty`, () => {
        const removeOldMap = spyOn(service, `removeOldMap`);
        component.city = mapCity;
        expect(removeOldMap).toHaveBeenCalledTimes(1);
      });
    });

    describe(`createMap method of MapService`, () => {
      it(`shouldn't call if city is empty`, () => {
        const createMap = spyOn(service, `createMap`);
        expect(createMap).toHaveBeenCalledTimes(0);
      });

      it(`should call if city isn't empty`, () => {
        const createMap = spyOn(service, `createMap`);
        component.city = mapCity;
        expect(createMap).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe(`markers`, () => {
    describe(`removeOldMarkers method of MapService`, () => {
      it(`shouldn't call if "markers" property is empty`, () => {
        const removeOldMarkers = spyOn(service, `removeOldMarkers`);
        component.markers = [];
        expect(removeOldMarkers).toHaveBeenCalledTimes(0);
      });

      it(`should call if "markers" property isn't empty`, () => {
        const removeOldMarkers = spyOn(service, `removeOldMarkers`);
        component.markers = mapMarkers;
        expect(removeOldMarkers).toHaveBeenCalledTimes(1);
      });
    });

    describe(`addMarkers method of MapService`, () => {
      it(`shouldn't call if "markers" property is empty`, () => {
        const addMarkers = spyOn(service, `addMarkers`);
        component.markers = [];
        expect(addMarkers).toHaveBeenCalledTimes(0);
      });

      it(`should call if "markers" property isn't empty`, () => {
        const addMarkers = spyOn(service, `addMarkers`);
        component.markers = mapMarkers;
        expect(addMarkers).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe(`activeMarkerId`, () => {
    it(`should call setActiveMarker method of MapService`, () => {
      const setActiveMarker = spyOn(service, `setActiveMarker`);
      component.activeMarkerId = `1`;
      expect(setActiveMarker).toHaveBeenCalledTimes(1);
    });
  });
});
