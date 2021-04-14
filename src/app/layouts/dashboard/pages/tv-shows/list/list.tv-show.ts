import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaType, Result } from 'src/app/core/interfaces/trending-response.interface';
import { AllMediasService } from 'src/app/core/services/all-medias.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.tv-show.html',
  styleUrls: ['./list.tv-show.css']
})
export class ListTvShow implements OnInit, OnDestroy {

  tvShows:Result[] = [];
  header: string = 'Tv Shows';

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if( pos > max ){

      if( this.allMediasService.loading ){ return; }

      const { genre } = this.activatedRoute.snapshot.params;

      this.getMovies( genre, MediaType.Tv );

    }

  }

  constructor(  private allMediasService:AllMediasService,
    private activatedRoute: ActivatedRoute) { 

      this.activatedRoute.params.subscribe( () => {
        this.tvShows = [];
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
      this.allMediasService.getAllByMedia( MediaType.Tv )
        .subscribe( tvShows => {
          this.tvShows.push(...tvShows);
        })
    }
    else{
      this.allMediasService.getMediaByGenre( genre, MediaType.Tv )
        .subscribe( tvShows => {
          this.tvShows.push(...tvShows);
          if( name ){
            this.header = name;
          }
        })
    }
  }

}
