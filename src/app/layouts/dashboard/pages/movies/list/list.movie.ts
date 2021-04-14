import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaType, Result } from 'src/app/core/interfaces/trending-response.interface';
import { AllMediasService } from 'src/app/core/services/all-medias.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.movie.html',
  styleUrls: ['./list.movie.css']
})
export class ListMovie implements OnInit, OnDestroy {

  movies:Result[] = [];
  header: string = 'Movies';

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if( pos > max ){

      if( this.allMediasService.loading ){ return; }

      const { genre } = this.activatedRoute.snapshot.params;

      this.getMovies( genre, MediaType.Movie );

    }

  }

  constructor(  private allMediasService:AllMediasService,
    private activatedRoute: ActivatedRoute) { 

      this.activatedRoute.params.subscribe( () => {
        this.movies = [];
        this.ngOnDestroy();
        this.ngOnInit();
      } )
    }


  ngOnDestroy(): void {
    this.allMediasService.reset();
  }

  ngOnInit(): void {

    const { genre, name } = this.activatedRoute.snapshot.params;

    this.getMovies( genre, name );

  }

  getMovies( genre: string, name?: string ){
    if( !genre ){
      this.allMediasService.getAllByMedia( MediaType.Movie )
        .subscribe( movies => {
          this.movies.push(...movies);
        })
    }
    else{
      this.allMediasService.getMediaByGenre( genre, MediaType.Movie )
        .subscribe( movies => {
          this.movies.push(...movies);
          if( name ){
            this.header = name;
          }
        })
    }
  }

}
