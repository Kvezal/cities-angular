import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { HeaderComponent } from './header.component';


@Component({
  template: `Favorite`
})
class FavoriteTestComponent {
}

@Component({
  template: `Main`
})
class MainTestComponent {
}

@Component({
  template: `<router-outlet></router-outlet>`
})
class AppComponent {
}

const routes: Routes = [
  {path: '', component: MainTestComponent},
  {path: 'favorite', component: FavoriteTestComponent},
];

describe(`HeaderComponent`, () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [
        HeaderComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it(`should create`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe(`email param`, () => {
    it(`should set .header__nav-link.href equal /login if user doesn't exist`, () => {
      const userLink = fixture.nativeElement.querySelector(`.header__nav-link`);
      component.email = null;
      fixture.detectChanges();
      expect(userLink.href).toMatch(`/login`);
    });

    it(`should set .header__nav-link.href equal /favorite if user exists`, () => {
      const userLink = fixture.nativeElement.querySelector(`.header__nav-link`);
      component.email = `email@gmail.com`;
      fixture.detectChanges();
      expect(userLink.href).toMatch(`/favorite`);
    });

    it(`span.header__user should contain email if user exists`, () => {
      const userSpan = fixture.nativeElement.querySelector(`.header__user`);
      component.email = `email@gmail.com`;
      fixture.detectChanges();
      expect(userSpan.textContent).toEqual(`email@gmail.com`);
    });

    it(`span.header__user should contain 'Sign in' if user doesn't exists`, () => {
      const userSpan = fixture.nativeElement.querySelector(`.header__user`);
      component.email = null;
      fixture.detectChanges();
      expect(userSpan.textContent).toEqual(`Sign in`);
    });
  });

  describe(`image param`, () => {
    it(`user avatar should contain placeholder by default`, () => {
      const userLink = fixture.nativeElement.querySelector(`.header__avatar`);
      component.image = null;
      fixture.detectChanges();
      expect(userLink.src).toMatch(`/assets/images/avatar.svg`);
    });

    it(`user avatar should contain image`, () => {
      const imagePath = `/assets/images/test/1.jpg`;
      const userLink = fixture.nativeElement.querySelector(`.header__avatar`);
      component.image = imagePath;
      fixture.detectChanges();
      expect(userLink.src).toMatch(imagePath);
    });
  });
});
