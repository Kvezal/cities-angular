import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';
import { LeafletService } from './leaflet.service';

describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LeafletService,
        MapService,
      ],
    });
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
