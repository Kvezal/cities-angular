import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';

const imageList: string[] = [
  `assets/images/test/apartment-03.jpg`,
  `assets/images/test/apartment-03.jpg`,
  `assets/images/test/apartment-03.jpg`,
  `assets/images/test/apartment-03.jpg`,
  `assets/images/test/apartment-03.jpg`,
  `assets/images/test/apartment-03.jpg`,
];

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should display all images`, () => {
    component.images = imageList;
    fixture.detectChanges();
    const images = fixture.nativeElement.querySelectorAll(`.image`);
    expect(images).toHaveSize(imageList.length);
  });
});
