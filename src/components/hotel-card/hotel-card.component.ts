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
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelCardComponent {
  @Output() changeIsFavoriteValue = new EventEmitter<boolean>();


  private _title = ``;
  @Input()
  public set title(value: string) {
    this._title = value;
    this._changeDetectorRef.markForCheck();
  }

  public get title(): string {
    return this._title;
  }


  private _price = 0;
  @Input()
  public set price(value: number) {
    this._price = value;
    this._changeDetectorRef.markForCheck();
  }

  public get price(): number {
    return this._price;
  }


  private _rating = 0;
  @Input()
  public set rating(value: number) {
    this._rating = value;
    this._changeDetectorRef.markForCheck();
  }

  public get rating(): number {
    return this._rating;
  }


  private _isPremium = false;
  @Input()
  public set isPremium(value: boolean) {
    this._isPremium = value;
    this._changeDetectorRef.markForCheck();
  }

  public get isPremium(): boolean {
    return this._isPremium;
  }


  private _hotelType = ``;
  @Input()
  public set hotelType(value: string) {
    this._hotelType = value;
    this._changeDetectorRef.markForCheck();
  }

  public get hotelType(): string {
    return this._hotelType;
  }


  private _image: string;
  @Input()
  public set image(value: string) {
    this._image = value;
    this._changeDetectorRef.markForCheck();
  }

  public get image(): string {
    return this._image;
  }


  private _isFavorite = false;
  @Input()
  public set isFavorite(value: boolean) {
    this._isFavorite = value;
    this._changeDetectorRef.markForCheck();
  }

  public get isFavorite(): boolean {
    return this._isFavorite;
  }


  private _cardType: EHotelCardType = EHotelCardType.MIDDLE;
  @Input()
  @HostBinding(`attr.cardType`)
  public set cardType(value: EHotelCardType) {
    this._cardType = value;
    this._changeFavoriteFlagType();
    this._changeDetectorRef.markForCheck();
  }

  public get cardType(): EHotelCardType {
    return this._cardType;
  }


  public favoriteFlagType: EFavoriteFlagType = EFavoriteFlagType.SMALL_SKEW;


  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}


  private _changeFavoriteFlagType(): void {
    this.favoriteFlagType = hotelCardTypeToFavoriteFlagTypeMap.get(this._cardType);
  }
}
