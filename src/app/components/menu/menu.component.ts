import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {IMenuItem} from './menu.interface';


@Component({
  selector: `app-menu`,
  templateUrl: `./menu.component.html`,
  styleUrls: [`./menu.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @Input() menuList: IMenuItem[];

  public trackById(index, item): string {
    return item.id;
  }
}
