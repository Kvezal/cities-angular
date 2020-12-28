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
        withLatestFrom(this._commentListBehaviorSubject),
        first(),
        map(([newCommentList, oldCommentList]) => [...oldCommentList, ...newCommentList])
      )
      .subscribe((commentList: IComment[]) => this._commentListBehaviorSubject.next(commentList));
  }


  public create(params: ICommentParams): void {
    this._commentApiService
      .create(params)
      .pipe(
        withLatestFrom(this.commentList$),
        first(),
        map(([newComment, commentList]) => [newComment, ...commentList])
      )
      .subscribe((commentList: IComment[]) => {
        this._commentListBehaviorSubject.next(commentList);
      });
  }


  public resetList(): void {
    this._commentListBehaviorSubject.next([]);
  }
}
