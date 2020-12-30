import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { ISelectOption } from './select.interface';


const options: ISelectOption[] = [
  {
    name: `name-1`,
    value: `value-1`,
  },
  {
    name: `name-2`,
    value: `value-2`,
  },
  {
    name: `name-3`,
    value: `value-3`,
  },
];

describe(`SelectComponent`, () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });


  describe(`label`, () => {
    it(`should be empty by default`, () => {
      const label: HTMLSpanElement = fixture.nativeElement.querySelector(`.select__label`);
      expect(label.textContent.trim()).toBe(``);
    });

    it(`should display a specified label`, () => {
      component.label = `test`;
      fixture.detectChanges();
      const label: HTMLSpanElement = fixture.nativeElement.querySelector(`.select__label`);
      expect(label.textContent.trim()).toBe(`test`);
    });
  });


  describe(`options`, () => {
    it(`should have empty option list by default`, () => {
      const optionList: HTMLLIElement[] = fixture.nativeElement.querySelectorAll(`.select__option`);
      expect(optionList.length).toBe(0);
    });

    it(`should display options`, () => {
      component.options = options;
      fixture.detectChanges();
      const optionList: HTMLLIElement[] = fixture.nativeElement.querySelectorAll(`.select__option`);
      expect(optionList.length).toBe(options.length);
    });

    it(`should display correct option names`, () => {
      component.options = options;
      fixture.detectChanges();
      const optionList: HTMLLIElement[] = fixture.nativeElement.querySelectorAll(`.select__option`);
      optionList.forEach((option: HTMLLIElement, index: number) => {
        const optionName: string = option.textContent.trim();
        expect(optionName).toBe(options[index].name);
      });
    });
  });


  describe(`value`, () => {
    beforeEach(() => {
      component.options = options;
    });

    it(`should set first option element by default`, () => {
      fixture.detectChanges();
      expect(component.value).toEqual(options[0].value);
    });

    it(`should display current value`, () => {
      const lastOption: ISelectOption = options[options.length - 1];
      component.value = lastOption.value;
      fixture.detectChanges();
      const label: HTMLSpanElement = fixture.nativeElement.querySelector(`.select__value span`);
      expect(label.textContent.trim()).toBe(lastOption.name);
    });

    it(`should set active option`, () => {
      const lastOption = options[options.length - 1];
      component.value = lastOption.value;
      fixture.detectChanges();
      const activeOption: HTMLLIElement = fixture.nativeElement.querySelector(`.select__option--active`);
      expect(activeOption.textContent.trim()).toBe(lastOption.name);
    });

    it(`should set correct value if click to option element`, () => {
      const optionList: HTMLLIElement[] = fixture.nativeElement.querySelectorAll(`.select__option`);
      optionList.forEach((option: HTMLLIElement, index: number) => {
        option.click();
        fixture.detectChanges();
        expect(component.value).toBe(options[index].value);
      });
    });

    it(`should emit correct value if click to option element`, () => {
      const optionList: HTMLLIElement[] = fixture.nativeElement.querySelectorAll(`.select__option`);
      let result: string;
      component.changeSelectionValueOutput.subscribe((value: string) => {
        result = value;
      });
      optionList.forEach((option: HTMLLIElement, index: number) => {
        option.click();
        fixture.detectChanges();
        expect(result).toBe(options[index].value);
      });
    });

    it(`should display correct value if click to option element`, () => {
      const optionList: HTMLLIElement[] = fixture.nativeElement.querySelectorAll(`.select__option`);
      const valueContainer: HTMLSpanElement = fixture.nativeElement.querySelector(`.select__value span`);
      optionList.forEach((option: HTMLLIElement, index: number) => {
        option.click();
        fixture.detectChanges();
        expect(valueContainer.textContent.trim()).toBe(options[index].value);
      });
    });

    it(`should set active class only clicked option`, () => {
      const optionList: HTMLLIElement[] = fixture.nativeElement.querySelectorAll(`.select__option`);
      optionList.forEach((optionElement: HTMLLIElement, optionElementIndex: number) => {
        optionElement.click();
        optionList.forEach((option: HTMLLIElement, optionIndex: number): void => {
          if (optionElementIndex === optionIndex) {
            expect(option).toHaveClass(`select__option--active`);
          } else {
            expect(option).not.toHaveClass(`select__option--active`);
          }
        });
      });
    });
  });

  describe(`isDisplayList`, () => {
    it(`shouldn't display option list by default`, () => {
      fixture.detectChanges();
      const listContainer: HTMLUListElement = fixture.nativeElement.querySelector(`.select__list`);
      expect(listContainer.hidden).toBeTruthy();
    });

    it(`should open option list if click to value container`, () => {
      const listContainer: HTMLUListElement = fixture.nativeElement.querySelector(`.select__list`);
      const valueContainer: HTMLDivElement = fixture.nativeElement.querySelector(`.select__value`);
      valueContainer.click();
      fixture.detectChanges();
      expect(listContainer.hidden).toBeFalsy();
    });
  });
});
