import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IComment } from '@interfaces';

import { ApiPath } from '../api-path.enum';
import { ApiService } from '../api.service';
import { IApiEntity } from '../interfaces';
import { ICommentParams } from './comment-api.interface';


@Injectable()
export class CommentApiService implements IApiEntity {
  public readonly basePath = ApiPath.COMMENT;

  constructor(private _apiService: ApiService) {
  }


  public getList(hotelId: string): Observable<IComment[]> {
    return this._apiService.get(this.basePath, {
      queries: {hotelId},
    });
  }


  public create(body: ICommentParams): Observable<IComment> {
    return this._apiService.post(this.basePath, {
      body,
    });
  }
}
