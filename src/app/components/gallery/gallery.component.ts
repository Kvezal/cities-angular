import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  @Input() images: string[];

  public trackByImage(index: number, image: string): string {
    return image;
  }
}
