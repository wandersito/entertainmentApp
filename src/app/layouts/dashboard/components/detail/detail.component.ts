import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/core/interfaces/credits.interface';
import { MediaType, Result } from 'src/app/core/interfaces/trending-response.interface';
import { AllMediasService } from '../../../../core/services/all-medias.service';
import { Provider } from '../../../../core/interfaces/providers.interface';
import { Keyword } from '../../../../core/interfaces/keywords.interface';

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
  provider!: Provider;
  keywords!: Keyword[];

  constructor(  private allMediasService:AllMediasService,
                private location: Location,
                private router: Router) { }

  ngOnInit(): void {

    combineLatest( [
      this.allMediasService.getMediaById( this.id, this.mediaType),
      this.allMediasService.getCastByMediaId( this.id, this.mediaType ),
      this.allMediasService.getProvidersByMedia( this.id, this.mediaType ),
      this.allMediasService.getKeywordsByMedia( this.id, this.mediaType )
    ]).subscribe( ( [media, cast, provider, keywords] ) => {

      this.media = media!;
      this.cast = cast.filter( actor => actor.profile_path != null );
      this.provider = provider;
      this.keywords =  keywords;
    });

  }

  onBack(){
    this.location.back();
  }

}
