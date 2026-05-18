import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, DOCUMENT } from '@angular/core';

import { Observable, map, retry } from 'rxjs';
import { OmdbResultDetails, OmdbErrorResponse, OmdbLookup, OmdbLookupResponse, OmdbSearch, OmdbSearchResponse, OmdbSearchResult, makeOmdbRequest, convertOmdbResponse } from './types/omdb';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {
  private API_KEY?: string;
  private API_URL = 'https://www.omdbapi.com/';

  constructor(
    private httpClient: HttpClient,
    @Inject(DOCUMENT) document: Document
  ) {
    const key = document.cookie
    .split("; ")
    .find((row) => row.startsWith("omdbapikey="))
    ?.split("=")[1];
    if (typeof key === 'string') {
      this.API_KEY = key;
    }
  }

  public retrieveOmdb(request: OmdbLookup): Observable<OmdbResultDetails>;
  public retrieveOmdb(request: OmdbSearch): Observable<OmdbSearchResult[]>;
  public retrieveOmdb(request: OmdbLookup | OmdbSearch): Observable<OmdbResultDetails | OmdbSearchResult[]> {
    if (this.API_KEY === undefined) {
      throw new Error("No API Key!");
    }
    const headers = new HttpHeaders({
      Accept: 'application/json'
    });
    // a little bit of functional programming to turn flat objects into HttpParams
    // tldr; turns the request keys into param keys and sets the api key
    const params = Object.entries(makeOmdbRequest(request))
    .filter(([header, value]) => header && value)
    .reduce(
      (acc, [header, value]) => acc.set(header, value),
      new HttpParams().set('apiKey', this.API_KEY)
    );
    // 
    const options = {
      headers: headers,
      params: params
    };
    return this.httpClient
      .get<OmdbLookupResponse | OmdbSearchResponse | OmdbErrorResponse>(this.API_URL, options)
      .pipe(
        map((response) => convertOmdbResponse(response)),
      );
  }
}
