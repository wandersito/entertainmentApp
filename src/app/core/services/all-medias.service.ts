import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Cast, Credits } from '../interfaces/credits.interface';
import { Genre, Genres } from '../interfaces/genre.interface';
import { Result, TimeWindow, TrendingResponse, MediaType } from '../interfaces/trending-response.interface';
import { Provider, ProvidersResponse } from '../interfaces/providers.interface';
import { KeywordsReponse, Keyword } from '../interfaces/keywords.interface';

@Injectable({
  providedIn: 'root'
})
export class AllMediasService {

  private baseUrl: string = environment.baseUrl;
  private apiKey:string =  environment.apiKey;
  private page:number = 1;
  private language: string = 'en-US'
  private _loading: boolean = false;
  private region: string = 'US';


  constructor( private http: HttpClient ) { }

  get loading(){
    return this._loading;
  }

  get params(){
    return {
      api_key: this.apiKey,
      language: this.language,
      page: this.page.toString()
    }
  }

  reset(){
    this.page = 1;
  }

  getGenresByMedia( media: string ):Observable<Genre[]>{

    const url = `${this.baseUrl}/genre/${media}/list`;

    return this.http.get<Genres>( url, { params: this.params })
          .pipe(
            map( genres => genres.genres)
          );

  }

  getTrending( timeWindow: TimeWindow ):Observable<Result[]>{

    if( this._loading ){ 
      return of([]);
    }
    
    this._loading = true;
    const url = `${this.baseUrl}/trending/all/${ timeWindow }`;

    return this.http.get<TrendingResponse>(url, {params: this.params })
      .pipe( 
        map( results => results.results ),
        tap( () => {
          this.page += 1;
          this._loading = false;
        })
      );
  }

  getCastByMediaId( id: string, media: MediaType ): Observable<Cast[]>{

    const url = `${this.baseUrl}/${media}/${id}/credits`;

    return this.http.get<Credits>( url, { params: this.params })
        .pipe(
          map( credits => credits.cast ),
          catchError( err => of([]))
        );

  }

  getMediaById( id: string, mediaType: MediaType ): Observable<Result | null>{

    const url = `${this.baseUrl}/${mediaType}/${id}`;

    return this.http.get<Result>(url, {params: this.params })
        .pipe( 
          catchError( err => of(null))
         );

  }

  getAllByMedia( mediaType: MediaType ):Observable<Result[]>{

    if( this._loading ){ 
      return of([]);
    }

    const url = `${this.baseUrl}/${ mediaType }/popular`;
    this._loading = true;

    return this.http.get<TrendingResponse>(url, {params: this.params })
      .pipe( 
        map( results => results.results ),
        tap( () => {
          this.page += 1;
          this._loading = false;
        })
      );
  }

  getMediaByGenre(genre: string, mediaType:MediaType):Observable<Result[]>{

    if( this._loading ){ 
      return of([]);
    }

    const url = `${this.baseUrl}/discover/${ mediaType }`;
    const params = { with_genres: genre,...this.params}
    this._loading = true;

    return this.http.get<TrendingResponse>(url, {params: params })
      .pipe( 
        map( results => results.results ),
        tap( () => {
          this.page += 1;
          this._loading = false;
        })
      );
  }

  getProvidersByMedia(id: string, mediaType:MediaType): Observable<Provider>{

    const url = `${this.baseUrl}/${mediaType}/${id}/watch/providers`;

    return this.http.get<ProvidersResponse>(url, {params: this.params })
      .pipe( 
        map( response => {
          let provider: Provider;
          const providerKeyValue = Object.entries(response.results).find( provider => provider[0] === this.region )!;
          if( !providerKeyValue ) { 
            provider = {
              link:'',
              buy:[],
              rent:[],
              flatrate:[]
            }
            return provider;
          };
          provider = providerKeyValue[1];
          return provider;
        })

      );

  }

  getKeywordsByMedia(id: string, mediaType:MediaType): Observable<Keyword[]>{

    const url = `${this.baseUrl}/${mediaType}/${id}/keywords`;

    return this.http.get<KeywordsReponse>(url, {params: this.params })
      .pipe( 
        map( response => response.keywords)
      );

  }

  getMediaBySearch( value: string ):Observable<Result[]>{

    if( !value || value.length === 0 ){
      return of([]);
    }

    if( this._loading ){ 
      return of([]);
    }

    this._loading = true;
    
    const url = `${this.baseUrl}/search/multi`;
    const params = { query:value,...this.params }

    return this.http.get<TrendingResponse>( url, { params: params } )
    .pipe(
      map( results => {
        return results.results.filter( result => result.poster_path )
      } ),
      tap( () => {
        this.page += 1;
        this._loading = false;
      })
    );

  }
  
}
