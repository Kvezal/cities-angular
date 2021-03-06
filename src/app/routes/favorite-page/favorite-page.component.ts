import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';

import { FavoritePageService } from './favorite-page.service';
import { IFavoriteLocation } from './favorite-page.interface';
import { IHotel } from '@interfaces';


@Component({
  selector: `app-favorite-page`,
  templateUrl: `./favorite-page.component.html`,
  styleUrls: [`./favorite-page.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritePageComponent implements OnDestroy {
  public locationList$: Observable<IFavoriteLocation[]> = this._favoritePageService.locationList$;


  constructor(
    private readonly _favoritePageService: FavoritePageService
  ) {
  }


  public toggleFavoriteStatus(hotelId: string): void {
    this._favoritePageService.toggleFavoriteStatus(hotelId);
  }


  public trackByHotel(index: number, hotel: IHotel): string {
    return hotel.id;
  }


  ngOnDestroy(): void {
    this._favoritePageService.removeNotFavoriteHotelsFromFavoriteList();
  }
}
