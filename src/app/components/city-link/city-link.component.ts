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
  @Input() label = ``;
  @Input() path = ``;


  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}
}
