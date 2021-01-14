import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  first,
  map,
  withLatestFrom
} from 'rxjs/operators';

import {
  CommentApiService,
  ICommentParams
} from '@api';
import { IComment } from '@interfaces';


@Injectable({
  providedIn: `root`
})
export class CommentService {
  private _commentListBehaviorSubject: BehaviorSubject<IComment[]> = new BehaviorSubject([]);
  public commentList$: Observable<IComment[]> = this._commentListBehaviorSubject.asObservable();


  constructor(private readonly _commentApiService: CommentApiService) {
  }


  public loadList(hotelId: string): void {
    this._commentApiService
      .loadList(hotelId)
      .pipe(
        first()
      )
      .subscribe((commentList: IComment[]) => this._commentListBehaviorSubject.next(commentList));
  }


  public create(params: ICommentParams): void {
    this._commentApiService
      .create(params)
      .pipe(
        withLatestFrom(this.commentList$),
        first(),
        map(([newComment, commentList]) => {
          const updatedCommentList = commentList.map((comment: IComment) => ({
            ...comment,
            rating: comment.user.id === newComment.user.id ? newComment.rating : comment.rating
          }));
          return [newComment, ...updatedCommentList];
        })
      )
      .subscribe((commentList: IComment[]) => {
        this._commentListBehaviorSubject.next(commentList);
      });
  }


  public resetList(): void {
    this._commentListBehaviorSubject.next([]);
  }
}
