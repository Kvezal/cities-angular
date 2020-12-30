import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { EFavoriteFlagType } from './favorite-flag.interface';


@Component({
  selector: `app-favorite-flag`,
  templateUrl: `./favorite-flag.component.html`,
  styleUrls: [`./favorite-flag.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteFlagComponent {
  @Output()
  changeIsActiveOutput = new EventEmitter<boolean>();


  private _isActive = false;
  @Input()
  @HostBinding(`class.active`)
  set isActive(value: boolean) {
    this._isActive = value;
    if (value) {
      this._renderer.addClass(this._elementRef.nativeElement, `active`);
    } else {
      this._renderer.removeClass(this._elementRef.nativeElement, `active`);
    }
  }
  get isActive(): boolean {
    return this._isActive;
  }


  @Input()
  @HostBinding(`attr.type`)
  public type: EFavoriteFlagType = EFavoriteFlagType.MIDDLE;


  @HostListener(`click`) clickFlagHandler(): void {
    this.isActive = !this.isActive;
    this.changeIsActiveOutput.emit(this.isActive);
  }

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _renderer: Renderer2
  ) {}
}
