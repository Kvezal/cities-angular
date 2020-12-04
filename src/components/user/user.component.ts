import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: `app-user`,
  templateUrl: `./user.component.html`,
  styleUrls: [`./user.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input() email: string;
  @Input() avatar = `assets/images/avatar.svg`;
}
