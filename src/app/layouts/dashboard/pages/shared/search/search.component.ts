import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from '../../../../../core/interfaces/trending-response.interface';
import { switchMap } from 'rxjs/operators';
import { AllMediasService } from '../../../../../core/services/all-medias.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  results!: Result[];
  search!: string;

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if( pos > max ){

      if( this.allMediasService.loading ){ return; }

      this.allMediasService.getMediaBySearch( this.search )
      .subscribe( mediaItems => {
        this.results.push(...mediaItems);
      });
    }

  }

  constructor(private activatedRoute:ActivatedRoute,
              private allMediasService:AllMediasService) { }

  ngOnInit(): void {

    this.allMediasService.reset()    ;

    this.activatedRoute.params
        .pipe(
          switchMap( ({value}) => {
            this.search = value;
            return this.allMediasService.getMediaBySearch( value )
          } )
        )
        .subscribe( results =>  {
          this.results = results;
          console.log( results)
        })

  }

  

}
