import { Location } from '@angular/common';
import {
  Component,
  NgZone
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { IMenuItem } from '../menu';
import { MenuComponent } from './menu.component';


@Component({
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
}


const menuList: IMenuItem[] = [
  {
    id: `1`,
    path: `home`,
    name: `home`,
  },
  {
    id: `2`,
    path: `search`,
    name: `search`,
  },
];


describe(`MenuComponent`, () => {
  let component: MenuComponent;
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<MenuComponent>;
  let zone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        MenuComponent,
      ],
    })
    .compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    zone = TestBed.inject(NgZone);
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
  });

  it(`should create`, () => {
    component.menuList = menuList;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe(`menuList`, () => {
    it(`shouldn't contain menu items by default`, () => {
      const menuItems = fixture.nativeElement.querySelectorAll(`.menu__item`);
      expect(menuItems).toHaveSize(0);
    });

    it(`should contain menu items`, () => {
      component.menuList = menuList;
      fixture.detectChanges();
      const menuItems = fixture.nativeElement.querySelectorAll(`.menu__item`);
      expect(menuItems).toHaveSize(menuList.length);
    });

    it(`links should have correct href`, () => {
      component.menuList = menuList;
      fixture.detectChanges();
      const menuItems = fixture.nativeElement.querySelectorAll(`.menu__link`);
      menuItems.forEach((menuItem: HTMLAnchorElement, index: number) => {
        expect(menuItem.href).toMatch(menuList[index].path);
      });
    });

    it(`link spans should have correct content`, () => {
      component.menuList = menuList;
      fixture.detectChanges();
      const menuLinkSpans = fixture.nativeElement.querySelectorAll(`.menu__link span`);
      menuLinkSpans.forEach((menuLinkSpan: HTMLSpanElement, index: number) => {
        expect(menuLinkSpan.textContent).toBe(menuList[index].name);
      });
    });
  });

  describe(`navigation by menu items`, () => {
    it(`should navigate correctly`, fakeAsync(() => {
      component.menuList = menuList;
      fixture.detectChanges();

      const menuItems = fixture.nativeElement.querySelectorAll(`.menu__link`);
      menuItems.forEach((item, index) => {
        item.click();
        tick();
        expect(location.path()).toMatch(menuList[index].path);
      });
    }));
  });

  describe(`activeFragment`, () => {
    it(`should be empty by default`, () => {
      expect(component.activeFragment).toBeUndefined();
    });

    it(`should set active class to menu option`, fakeAsync(() => {
      component.menuList = menuList;
      fixture.detectChanges();
      const menuLinks = fixture.nativeElement.querySelectorAll(`.menu__link`);
      menuLinks.forEach((link, index) => {
        link.click();
        tick();
        fixture.detectChanges();
        const activeLink = fixture.nativeElement.querySelector(`.menu__link--active`);
        expect(activeLink.textContent).toBe(menuList[index].name);
      });
    }));
  });
});
