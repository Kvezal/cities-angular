import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';


fdescribe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`isActive input`, () => {
    it(`should set "active" class if "true"`, () => {
      component.isActive = true;
      fixture.detectChanges();
      expect(fixture.nativeElement).toHaveClass(`active`);
    });

    it(`shouldn't set "active" class if "false"`, () => {
      component.isActive = false;
      fixture.detectChanges();
      expect(fixture.nativeElement).not.toHaveClass(`active`);
    });

    it(`should be "false" by default`, () => {
      expect(component.isActive).toBeFalsy();
    });
  });
});
