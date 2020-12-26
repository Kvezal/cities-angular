import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IApiOptions,
  IApiQueryParams
} from './interfaces';


@Injectable({
  providedIn: `root`
})
export class ApiService {
  private readonly _baseUrl = `http://localhost:3000/api`;


  constructor(private readonly _httpClient: HttpClient) {}


  public get<Type>(path: string, options: IApiOptions = {}): Observable<Type> {
    const fullPath = this._getFullPath(path, options.queries);
    return this._httpClient.get<Type>(
      `${this._baseUrl}/${fullPath}`,
      {
        withCredentials: true,
        responseType: 'json',
      },
    );
  }


  public post<Type>(path: string, options: IApiOptions = {}): Observable<Type> {
    const fullPath = this._getFullPath(path, options.queries);
    return this._httpClient.post<Type>(
      `${this._baseUrl}/${fullPath}`,
      options.body || null,
      {
        withCredentials: true,
        responseType: 'json',
      }
    );
  }


  public head<Type>(path: string): Observable<Type> {
    return this._httpClient.head<Type>(
      `${this._baseUrl}/${path}`,
      {
        withCredentials: true,
        responseType: 'json',
      },
    );
  }


  private _getFullPath(path: string, queryParams: IApiQueryParams = {}): string {
    const queries = Object
      .entries(queryParams)
      .map(([key, value]: [string, string | number | boolean]) => `${key}=${value}`)
      .join(`&`);
    return [path, queries].join(`?`);
  }
}
