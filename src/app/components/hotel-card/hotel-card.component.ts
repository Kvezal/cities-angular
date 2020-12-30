import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';

import { EFavoriteFlagType } from '../favorite-flag';
import { hotelCardTypeToFavoriteFlagTypeMap } from './hotel-card.map';
import { EHotelCardType } from './hotel-card.interface';


@Component({
  selector: `app-hotel-card`,
  templateUrl: `./hotel-card.component.html`,
  styleUrls: [`./hotel-card.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelCardComponent {
  @Output() changeIsFavoriteValue = new EventEmitter<boolean>();

  @Input()
  public id: string;

  @Input()
  public title = ``;

  @Input()
  public price = 0;

  @Input()
  public rating = 0;

  @Input()
  public isPremium = false;

  @Input()
  public hotelType = ``;

  @Input()
  public image = ``;

  @Input()
  public isFavorite = false;

  @Input()
  public hasFavoriteFlag = false;


  private _cardType: EHotelCardType = EHotelCardType.MIDDLE;
  @Input()
  @HostBinding(`attr.cardType`)
  public set cardType(value: EHotelCardType) {
    this._cardType = value;
    this.favoriteFlagType = hotelCardTypeToFavoriteFlagTypeMap.get(this._cardType);
    this._changeDetectorRef.markForCheck();
  }


  public get cardType(): EHotelCardType {
    return this._cardType;
  }


  public favoriteFlagType: EFavoriteFlagType = EFavoriteFlagType.SMALL_SKEW;


  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}
}
