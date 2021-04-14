import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MediaType, Result } from 'src/app/core/interfaces/trending-response.interface';
import { AllMediasService } from 'src/app/core/services/all-medias.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.tv-show.html',
  styleUrls: ['./list.tv-show.css']
})
export class ListTvShow implements OnInit, OnDestroy {

  tvShows:Result[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if( pos > max ){

      if( this.allMediasService.loading ){ return; }

      this.allMediasService.getAllByMedia( MediaType.Tv )
      .subscribe( tvShows => {
        this.tvShows.push(...tvShows);
      });
    }

  }

  constructor( private allMediasService: AllMediasService ) { }

  ngOnDestroy(): void {
    this.allMediasService.reset();
  }

  ngOnInit(): void {

      this.allMediasService.getAllByMedia( MediaType.Tv )
        .subscribe( tvShows => {
          this.tvShows = tvShows;
        });
  }

}
