import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { FavoriteFlagComponent } from './favorite-flag.component';


describe('FavoriteFlagComponent', () => {
  let component: FavoriteFlagComponent;
  let fixture: ComponentFixture<FavoriteFlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteFlagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`isActive`, () => {
    it(`shouldn't have "active" class by default`, () => {
      expect(fixture.nativeElement).not.toHaveClass(`active`);
    });

    it(`should set "active" class`, () => {
      component.isActive = true;
      expect(fixture.nativeElement).toHaveClass(`active`);
    });

    it(`should change isActive flag if click to host-element`, () => {
      component.isActive = false;
      fixture.nativeElement.click();
      expect(component.isActive).toBeTruthy();
      fixture.nativeElement.click();
      expect(component.isActive).toBeFalsy();
    });
  });

  it(`changeIsActiveOutput should emit event if click to host-element`, () => {
    component.isActive = false;
    let result = false;
    component.changeIsActiveOutput.subscribe((value) => {
      result = value;
    });
    fixture.nativeElement.click();
    expect(result).toBeTruthy();
    fixture.nativeElement.click();
    expect(result).toBeFalsy();
  });

  it(`click to host-element should call clickFlagHandler method`, () => {
    spyOn(component, `clickFlagHandler`);
    fixture.nativeElement.click();
    expect(component.clickFlagHandler).toHaveBeenCalledTimes(1);
  });
});
