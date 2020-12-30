import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CityLinkComponent } from './city-link.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';

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


describe(`CityLinkComponent`, () => {
  let component: CityLinkComponent;
  let fixture: ComponentFixture<CityLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [
        CityLinkComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityLinkComponent);
    component = fixture.componentInstance;
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`path`, () => {
    it(`should set path by default`, () => {
      const link = fixture.nativeElement.querySelector(`.city-link`);
      expect(link.href).toMatch('');
    });

    it(`should set href`, () => {
      component.path = `test`;
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector(`.city-link`);
      expect(link.href).toMatch(/\/test$/);
    });
  });

  describe(`label`, () => {
    it(`should be empty by default`, () => {
      const link = fixture.nativeElement.querySelector(`.city-link`);
      expect(link.textContent.trim()).toBe(``);
    });

    it(`should display label with value`, () => {
      component.label = `test`;
      fixture.detectChanges();
      const label = fixture.nativeElement.querySelector(`.city-link__label`);
      expect(label.textContent.trim()).toBe(`test`);
    });
  });
});
