import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';
import { ERatingSize } from './rating.interface';


describe(`RatingComponent`, () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });


  describe(`maxValue`, () => {
    it(`should have "5" stars by default`, () => {
      const stars = fixture.nativeElement.querySelectorAll(`.rating__star`);
      expect(stars).toHaveSize(5);
    });

    it(`should set star count`, () => {
      const count = 10;
      component.maxValue = count;
      const stars = fixture.nativeElement.querySelectorAll(`.rating__star`);
      expect(stars).toHaveSize(count);
    });
  });


  describe(`value`, () => {
    it(`shouldn't set star filling by default`, () => {
      const activeRect = fixture.nativeElement.querySelector(`.rating__rect--active`);
      expect(activeRect.width.baseVal.valueAsString).toEqual(`0%`);
    });

    it(`should set half star filling`, () => {
      component.value = 0.5;
      const activeRect = fixture.nativeElement.querySelector(`.rating__rect--active`);
      expect(activeRect.width.baseVal.valueAsString).toEqual(`50%`);
    });

    it(`should fill several stars`, () => {
      component.value = 3.5;
      const activeRects = fixture.nativeElement.querySelectorAll(`.rating__rect--active`);
      expect(activeRects[0].width.baseVal.valueAsString).toEqual(`100%`);
      expect(activeRects[1].width.baseVal.valueAsString).toEqual(`100%`);
      expect(activeRects[2].width.baseVal.valueAsString).toEqual(`100%`);
      expect(activeRects[3].width.baseVal.valueAsString).toEqual(`50%`);
    });

    it(`should set default value if param is negative`, () => {
      component.value = -1;
      expect(component.value).toEqual(0);
    });
  });


  describe(`isClickable`, () => {
    it(`shouldn't be clickable by default`, () => {
      expect(fixture.nativeElement).not.toHaveClass(`clickable`);
    });

    it(`should set clickable class to host-element`, () => {
      component.isClickable = true;
      fixture.detectChanges();
      expect(fixture.nativeElement).toHaveClass(`clickable`);
    });
  });


  describe(`size`, () => {
    it(`should set size attribute by default`, () => {
      const sizeAttribute = fixture.nativeElement.getAttribute(`size`);
      expect(sizeAttribute).toEqual(ERatingSize.NANO);
    });

    it(`should set size attribute`, () => {
      Object.values(ERatingSize).forEach((size: ERatingSize) => {
        component.size = size;
        fixture.detectChanges();
        const sizeAttribute = fixture.nativeElement.getAttribute(`size`);
        expect(sizeAttribute).toEqual(size);
      });
    });
  });
});
