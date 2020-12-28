import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: `app-city-page`,
  templateUrl: `./city-page.component.html`,
  styleUrls: [`./city-page.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
