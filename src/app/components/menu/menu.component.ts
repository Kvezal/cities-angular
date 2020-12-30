import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMenuItem } from './menu.interface';


@Component({
  selector: `app-menu`,
  templateUrl: `./menu.component.html`,
  styleUrls: [`./menu.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  @Output()
  changeActiveOutput = new EventEmitter<string>();

  @Input()
  menuList: IMenuItem[];

  @Input()
  public activeFragment: string;


  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
  ) {}


  ngOnInit(): void {
    this._activatedRoute.fragment.subscribe((fragment: string) => {
      if (fragment) {
        this.changeActiveOutput.next(fragment);
        this.activeFragment = fragment;
        this._changeDetectorRef.markForCheck();
      }
    });
  }


  public trackById(index, item): string {
    return item.id;
  }
}
