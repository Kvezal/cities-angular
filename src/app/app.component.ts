import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IHeaderUser } from '@components';

import { AppService } from './app.service';


@Component({
  selector: `app-root`,
  templateUrl: `./app.component.html`,
  styleUrls: [`./app.component.scss`]
})
export class AppComponent {
  public readonly user$: Observable<IHeaderUser> = this._appService.user$;


  constructor(private readonly _appService: AppService) {
  }
}
