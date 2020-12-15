import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';


@Component({
  selector: `app-user`,
  templateUrl: `./user.component.html`,
  styleUrls: [`./user.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private _email: string;
  @Input()
  set email(value: string) {
    this._email = value;
    this._changeDetectorRef.markForCheck();
  }
  get email(): string {
    return this._email;
  }

  private _avatar = `assets/images/avatar.svg`;
  @Input()
  set avatar(value: string) {
    this._avatar = value ? value : `assets/images/avatar.svg`;
    this._changeDetectorRef.markForCheck();
  }
  get avatar(): string {
    return this._avatar;
  }


  constructor(private _changeDetectorRef: ChangeDetectorRef) {}
}
