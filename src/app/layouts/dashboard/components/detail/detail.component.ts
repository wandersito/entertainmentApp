import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/core/interfaces/credits.interface';
import { MediaType, Result } from 'src/app/core/interfaces/trending-response.interface';
import { AllMediasService } from '../../../../core/services/all-medias.service';

@Component({
  selector: 'component-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() mediaType!: MediaType;
  @Input() id!: string;

  media!:Result;
  cast: Cast[] = [];

  constructor(  private allMediasService:AllMediasService,
                private location: Location,
                private router: Router) { }

  ngOnInit(): void {

    combineLatest( [
      this.allMediasService.getMediaById( this.id, this.mediaType),
      this.allMediasService.getCastByMediaId( this.id, this.mediaType )
    ]).subscribe( ( [media, cast] ) => {
      if( !media ){
        this.router.navigateByUrl('/home')
        return;
      }
      this.media = media;
      this.cast = cast.filter( actor => actor.profile_path != null );
    });

  }

  onBack(){
    this.location.back();
  }

}
