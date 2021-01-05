import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  Observable,
  Subject
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IComment } from '@interfaces';

import { OfferPageService } from './offer-page.service';
import { IOfferPageParams } from './offer-page.interface';


@Component({
  selector: `app-offer-page`,
  templateUrl: `./offer-page.component.html`,
  styleUrls: [`./offer-page.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferPageComponent implements OnInit, OnDestroy {
  private _destroy: Subject<void> = new Subject<void>();
  public pageParams$: Observable<IOfferPageParams> = this._offerPageService.pageParams$;
  public commentForm = new FormGroup({
    text: new FormControl(
      ``,
      [
        Validators.minLength(50),
        Validators.required
      ]
    ),
    rating: new FormControl(
      0,
      [
        Validators.min(1),
        Validators.max(5),
        Validators.required
      ]
    ),
  });


  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _offerPageService: OfferPageService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
  ) {
  }


  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((params: Params) => {
        const { id: hotelId } = params;
        this._offerPageService.loadContent(hotelId);
        this.commentForm.reset();
      });
  }


  public toggleFavoriteStatus(hotelId: string): void {
    this._offerPageService.toggleFavoriteStatus(hotelId);
  }


  public submit(): void {
    this._offerPageService.createComment({
      text: this.commentForm.value.text,
      rating: this.commentForm.value.rating,
      hotelId: this._activatedRoute.snapshot.params.id,
    });
    this.commentForm.reset();
  }


  public trackByComment(index: number, comment: IComment): string {
    return comment.id;
  }


  public trackByFeature(index: number, feature: string): string {
    return feature;
  }


  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.unsubscribe();
  }
}
