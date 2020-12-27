import { Observable } from 'rxjs';

import { IApiOptions } from './api-options.interface';


export interface IGetApiItem {
  getItem<ResultItemType>(options?: IApiOptions): Observable<ResultItemType>;
}
