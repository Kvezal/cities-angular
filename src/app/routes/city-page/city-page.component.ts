import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { ESortingType } from '@api';
import {
  IMapCity,
  IMapMarker,
  IMenuItem,
  ISelectOption
} from '@components';
import {
  ICity,
  IHotel,
  IList
} from '@interfaces';

import { CityPageService } from './city-page.service';



@Component({
  selector: `app-city-page`,
  templateUrl: `./city-page.component.html`,
  styleUrls: [`./city-page.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityPageComponent implements OnInit {
  public isAuthorized$: Observable<boolean> = this._cityPageService.isAuthorized$;
  public hotelParams$: Observable<IList<IHotel>> = this._cityPageService.hotelParams$;
  public menuList$: Observable<IMenuItem[]> = this._cityPageService.menuList$;
  public sorting$: Observable<ESortingType> = this._cityPageService.sorting$;
  public mapCityParams$: Observable<IMapCity> = this._cityPageService.mapCityParams$;
  public mapMarkerList$: Observable<IMapMarker[]> = this._cityPageService.mapMarkerList$;

  public sortingOptions: ISelectOption[] = this._cityPageService.sortingOptions;
  public activeMarkerId: string;


  constructor(
    private readonly _cityPageService: CityPageService,
    private readonly _router: Router,
    private readonly _changeDetectorRef: ChangeDetectorRef,
  ) {}


  ngOnInit(): void {
    this._initCityMenuFragment();
  }


  public switchCityByName(cityName: string): void {
    this._cityPageService.switchCityByName(cityName);
  }


  public switchHotelSorting(sorting: string): void {
    this._cityPageService.switchHotelSorting(sorting as ESortingType);
  }


  public toggleFavoriteStatus(hotelId: string): void {
    this._cityPageService.toggleFavoriteStatus(hotelId);
  }


  public setActiveMarkerId(markerId: string): void {
    this.activeMarkerId = markerId;
    this._changeDetectorRef.markForCheck();
  }


  private _initCityMenuFragment(): void {
    this._cityPageService.city$
      .pipe(
        first(),
      )
      .subscribe((city: ICity) => {
        this._router.navigate([], {fragment: city.title});
      });
  }
}
