import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';

import {
  ERatingSize,
  IRatingStar
} from './rating.interface';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.svg',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements OnInit {
  public stars: IRatingStar[];
  public starWidth = 13;


  @Output()
  public changeValueOutput = new EventEmitter();


  private _value = 0;
  @Input()
  public set value(value: number) {
    this._value = value <= 0 ? 0 : value;
    this._initStars();
    this._changeDetectorRef.detectChanges();
  }
  public get value(): number {
    return this._value;
  }


  private _maxValue = 5;
  @Input()
  public set maxValue(value) {
    this._maxValue = value;
    this._initStars();
    this._changeDetectorRef.detectChanges();
  }
  public get maxValue(): number {
    return this._maxValue;
  }


  @Input()
  @HostBinding(`class.clickable`)
  public isClickable = false;


  private _size: ERatingSize = ERatingSize.NANO;
  @Input()
  set size(value: ERatingSize) {
    this._size = value;
    this._initType();
  }
  get size(): ERatingSize {
    return this._size;
  }


  @HostListener(`click`, [`$event`])
  public clickStarHandler(event: MouseEvent): void {
    if (!this.isClickable) {
      return;
    }
    const star = (event.target as SVGRectElement).ownerSVGElement;
    if (star) {
      const starValue = +star.id;
      this.value = starValue;
      this.changeValueOutput.emit(starValue);
    }
  }


  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _elementRef: ElementRef,
    private readonly _renderer: Renderer2
  ) {}


  ngOnInit(): void {
    this._initStars();
    this._initType();
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


  private _initType(): void {
    this._renderer.setAttribute(this._elementRef.nativeElement, `size`, this._size);
  }


  public trackByValue(index, item): number {
    return item;
  }
}
