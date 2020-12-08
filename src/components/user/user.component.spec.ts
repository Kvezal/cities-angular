import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';


describe(`UserComponent`, () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`email`, () => {
    it(`shouldn't exist email container if email is empty`, () => {
      const emailContainer = fixture.nativeElement.querySelector(`.user__email`);
      expect(emailContainer).toBeNull();
    });

    it(`should set email in email container`, () => {
      component.email = `test-email`;
      fixture.detectChanges();
      const emailContainer = fixture.nativeElement.querySelector(`.user__email`);
      expect(emailContainer.textContent).toBe(`test-email`);
    });
  });

  describe(`avatar`, () => {
    it('avatar image should be placeholder by default', () => {
      const avatarContainer = fixture.nativeElement.querySelector(`.user__avatar-wrapper img`);
      expect(avatarContainer.src).toMatch(`assets/images/avatar.svg`);
    });

    it(`should set avatar image`, () => {
      component.avatar = `assets/images/test/1.jpg`;
      fixture.detectChanges();
      const avatarContainer = fixture.nativeElement.querySelector(`.user__avatar-wrapper img`);
      expect(avatarContainer.src).toMatch(`assets/images/test/1.jpg`);
    });
  });
});
