import { IApiQueryParams } from './api-query-params.interface';
import { IApiBodyParams } from './api-body-params.interface';


export interface IApiOptions<BodyType = any, QueryType = any> {
  queries?: IApiQueryParams<QueryType>;
  body?: IApiBodyParams<BodyType>;
  params?: string[];
}
