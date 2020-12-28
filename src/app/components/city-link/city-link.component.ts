import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';


@Component({
  selector: `app-city-link`,
  templateUrl: `./city-link.component.html`,
  styleUrls: [`./city-link.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityLinkComponent {
  private _path = ``;
  @Input()
  public set path(value: string) {
    this._path = value || ``;
    this._changeDetectorRef.detectChanges();
  }
  public get path(): string {
    return this._path;
  }

  private _label = ``;
  @Input()
  public set label(value: string) {
    this._label = value || ``;
    this._changeDetectorRef.detectChanges();
  }
  public get label(): string {
    return this._label;
  }


  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}
}
