import { Component, HostListener, OnInit } from '@angular/core';
import { AllMediasService } from '../../../../../core/services/all-medias.service';
import { Result, TimeWindow } from '../../../../../core/interfaces/trending-response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dayTrending:Result[] = [];

  weekTrending:Result[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if( pos > max ){

      if( this.allMediasService.loading ){ return; }

      this.allMediasService.getTrending( TimeWindow.Week )
      .subscribe( mediaItems => {
        this.weekTrending.push(...mediaItems);
      });
    }

  }

  constructor( private allMediasService: AllMediasService ) { }

  ngOnDestroy(): void {
    this.allMediasService.reset();
  }

  ngOnInit(): void {

    this.allMediasService.getTrending( TimeWindow.Week )
        .subscribe( mediaItems => {
          this.weekTrending = mediaItems;
        });

      this.allMediasService.getTrending( TimeWindow.Day )
        .subscribe( mediaItems => {
          this.dayTrending = mediaItems;
        });
  }

}
