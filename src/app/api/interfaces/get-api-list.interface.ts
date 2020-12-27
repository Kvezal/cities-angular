import { Observable } from 'rxjs';

import { IApiOptions } from './api-options.interface';


export interface IGetApiList<ResultItemType = any> {
  getList(options?: IApiOptions): Observable<ResultItemType[]>;
}
