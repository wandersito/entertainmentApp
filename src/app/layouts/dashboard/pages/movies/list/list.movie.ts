import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MediaType, Result } from 'src/app/core/interfaces/trending-response.interface';
import { AllMediasService } from 'src/app/core/services/all-medias.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.movie.html',
  styleUrls: ['./list.movie.css']
})
export class ListMovie implements OnInit, OnDestroy {

  movies:Result[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if( pos > max ){

      if( this.allMediasService.loading ){ return; }

      this.allMediasService.getAllByMedia( MediaType.Movie )
      .subscribe( movies => {
        this.movies.push(...movies);
      });
    }

  }

  constructor( private allMediasService: AllMediasService ) { }

  ngOnDestroy(): void {
    this.allMediasService.reset();
  }

  ngOnInit(): void {

      this.allMediasService.getAllByMedia( MediaType.Movie )
        .subscribe( mediaItems => {
          this.movies = mediaItems;
        });
  }

}
