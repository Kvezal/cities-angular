import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IUserResponse } from '@api';
import { HeaderModule } from '@components';

import { AppComponent } from './app.component';
import { AppService } from './app.service';


const user: IUserResponse = {
  id: `023dda52-f07b-47ef-a44c-2301f8743149`,
  name: `kvezal`,
  email: `kvezal@gmail.com`,
  image: `assets/images/test/1.jpg`,
};

describe(`AppComponent`, () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HeaderModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        {
          provide: AppService,
          useValue: {
            user$: of(user),
          }
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should contain app-header`, () => {
    const header = fixture.nativeElement.querySelector(`app-header`);
    expect(header).not.toBeNull(user);
  });

  describe(`user$`, () => {
    it(`should set app-header user property`, () => {
      const header = fixture.debugElement.query(By.css(`app-header`)).componentInstance;
      expect(header.user).toEqual(user);
    });
  });
});
