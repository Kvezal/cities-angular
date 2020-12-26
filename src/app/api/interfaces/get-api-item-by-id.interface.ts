import { Observable } from 'rxjs';


export interface IGetApiItemById<ResultItemType = any> {
  getItemById(id: string | number): Observable<ResultItemType>;
}
