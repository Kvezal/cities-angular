import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: `app-offer-page`,
  templateUrl: `./offer-page.component.html`,
  styleUrls: [`./offer-page.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
