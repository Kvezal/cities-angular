import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { ISelectOption } from './select.interface';


@Component({
  selector: `app-select`,
  templateUrl: `./select.component.html`,
  styleUrls: [`./select.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Output()
  public changeSelectionValueOutput = new EventEmitter<string>();


  private _isOpen = false;
  public set isOpen(value: boolean) {
    this._isOpen = value;
    this._changeDetectorRef.markForCheck();
  }
  public get isOpen(): boolean {
    return this._isOpen;
  }


  @Input()
  public value: string;


  @Input() label = ``;


  private _options: ISelectOption[] = [];
  @Input()
  public set options(value: ISelectOption[]) {
    this._options = value || [];
    if (!this.value && this._options.length !== 0) {
      this.value = this._options[0].value;
    }
    this._changeDetectorRef.markForCheck();
  }
  public get options(): ISelectOption[] {
    return this._options;
  }


  constructor(private readonly _changeDetectorRef: ChangeDetectorRef) { }


  public setSelectionValue(value: string): void {
    this.value = value;
    this.changeSelectionValueOutput.emit(value);
    this._changeDetectorRef.markForCheck();
  }


  public toggleSelectionList(): void {
    this.isOpen = !this.isOpen;
  }


  public getCurrentOptionName(): string {
    const currentOption: ISelectOption = this.options.find((option: ISelectOption) => option.value === this.value);
    return currentOption?.name || ``;
  }


  public trackByValue(index: number, item: ISelectOption): string {
    return item.value;
  }
}
