import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: `app-favorite-page`,
  templateUrl: `./favorite-page.component.html`,
  styleUrls: [`./favorite-page.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
