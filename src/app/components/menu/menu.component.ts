import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {IMenuItem} from './menu.interface';


@Component({
  selector: `app-menu`,
  templateUrl: `./menu.component.html`,
  styleUrls: [`./menu.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private _menuList: IMenuItem[];
  @Input()
  set menuList(list: IMenuItem[]) {
    this._menuList = list;
  }
  get menuList(): IMenuItem[] {
    return this._menuList;
  }

  public trackById(index, item): string {
    return item.id;
  }
}
