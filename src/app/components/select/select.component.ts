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
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Output()
  public changeSelectionValueOutput = new EventEmitter<string>();


  private _isOpen = false;
  public set isOpen(value: boolean) {
    this._isOpen = value;
    this._changeDetectorRef.detectChanges();
  }
  public get isOpen(): boolean {
    return this._isOpen;
  }


  private _value: string;
  @Input()
  public set value(value: string) {
    this._value = value;
    this.changeSelectionValueOutput.emit(value);
    this._changeDetectorRef.detectChanges();
  }
  public get value(): string {
    return this._value;
  }


  private _label: string;
  @Input()
  public set label(value: string) {
    this._label = value;
    this._changeDetectorRef.markForCheck();
  }
  public get label(): string {
    return this._label;
  }


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
  }


  public toggleSelectionList(): void {
    this.isOpen = !this.isOpen;
  }


  public trackByValue(index: number, item: ISelectOption): string {
    return item.value;
  }
}
