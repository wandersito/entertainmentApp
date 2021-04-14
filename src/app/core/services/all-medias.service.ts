import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Cast, Credits } from '../interfaces/credits.interface';
import { Genre, Genres } from '../interfaces/genre.interface';
import { Result, TimeWindow, TrendingResponse, MediaType } from '../interfaces/trending-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AllMediasService {

  private baseUrl: string = environment.baseUrl;
  private apiKey:string =  environment.apiKey;
  private page:number = 1;
  private language: string = 'en-US'
  private _loading: boolean = false;


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

    const url = `${this.baseUrl}/trending/all/${ timeWindow }`;

    return this.http.get<TrendingResponse>(url, {params: this.params })
      .pipe( 
        map( results => results.results )
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
  
}
