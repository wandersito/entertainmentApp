import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Genre, Genres } from '../interfaces/genre.interface';
import { Result, TimeWindow, TrendingResponse } from '../interfaces/trending-response.interface';

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
  
}
