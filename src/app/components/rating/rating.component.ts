import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import {
  ERatingSize,
  IRatingStar
} from './rating.interface';


@Component({
  selector: `app-rating`,
  templateUrl: `./rating.component.svg`,
  styleUrls: [`./rating.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    }
  ],
})
export class RatingComponent implements OnInit, ControlValueAccessor {
  @Input()
  public set value(value: number) {
    this._value = value <= 0 ? 0 : value;
    this._initStars();
    this._changeDetectorRef.markForCheck();
  }
  public get value(): number {
    return this._value;
  }
  @Input()
  public set maxValue(value) {
    this._maxValue = value;
    this._initStars();
    this._changeDetectorRef.markForCheck();
  }
  public get maxValue(): number {
    return this._maxValue;
  }


  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _renderer: Renderer2,
    private readonly _elementRef: ElementRef
  ) {}
  public stars: IRatingStar[];


  private _value = 0;


  private _maxValue = 5;


  @Input()
  @HostBinding(`class.clickable`)
  public isClickable = false;


  @Input()
  @HostBinding(`attr.size`)
  public size: ERatingSize = ERatingSize.NANO;
  public _onChange = (param: any): void => {};
  private _onTouched = (param: any): void => {};


  @HostListener(`click`, [`$event`])
  public clickStarHandler(event: MouseEvent): void {
    if (!this.isClickable) {
      return;
    }
    if (event.target instanceof SVGSVGElement) {
      this.writeValue(+event.target.id);
      return;
    }
    const star = (event.target as SVGRectElement).ownerSVGElement;
    if (star) {
      this.writeValue(+star.id);
    }
  }


  ngOnInit(): void {
    this._initStars();
  }


  public trackByValue(index, item): number {
    return item;
  }


  public writeValue(value: number): void {
    this.value = value;
    this._onChange(value);
  }


  public registerOnChange(fn: (param: any) => void): void {
    this._onChange = fn;
  }


  public registerOnTouched(fn: (param: any) => void): void {
    this._onTouched = fn;
  }


  private _initStars(): void {
    this.stars = new Array(this.maxValue)
      .fill(0)
      .map((star: number, index: number) => {
        return {
          value: index + 1,
          filling: this._getStarFilling(index),
        };
      });
  }


  private _getStarFilling(value): string {
    let filling = this.value - value;
    if (filling > 1) {
      filling = 1;
    } else if (filling < 0) {
      filling = 0;
    }
    return `${filling * 100}%`;
  }
}
