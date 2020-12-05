import { Location } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuComponent } from './menu.component';


@Component({
  template: `Search`
})
export class SearchComponent {
}

@Component({
  template: `Home`
})
export class HomeComponent {
}

@Component({
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
}

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent}
];

const menuList = [
  {
    id: `1`,
    path: `/home`,
    name: `home`,
  },
  {
    id: `2`,
    path: `/search`,
    name: `search`,
  },
];


describe('MenuComponent', () => {
  let component: MenuComponent;
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<MenuComponent>;
  let zone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
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

  it('should create', () => {
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
    it(`should navigate`, async () => {
      component.menuList = menuList;
      fixture.detectChanges();
      await zone.run(async () => {
        router.initialNavigation();
        for (const menuItem of menuList) {
          await router.navigate([menuItem.path]);
          expect(location.path()).toBe(menuItem.path);
        }
      });
    });

    it(`should set active class correctly`, async () => {
      component.menuList = menuList;
      fixture.detectChanges();
      await zone.run(async () => {
        router.initialNavigation();
        for (const menuItem of menuList) {
          await router.navigate([menuItem.path]);
          const activeMenuItem = fixture.nativeElement.querySelector(`.menu__link--active`);
          expect(activeMenuItem.href).toMatch(menuItem.path);
        }
      });
    });
  });
});
