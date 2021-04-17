import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllMediasService } from '../../../../../core/services/all-medias.service';
import { MediaType } from '../../../../../core/interfaces/trending-response.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.movie.html',
  styleUrls: ['./detail.movie.css']
})
export class DetailMovie implements OnInit, OnDestroy {

  id!: string;
  mediaType: MediaType = MediaType.Movie;

  constructor(  private activatedRoute: ActivatedRoute,
                private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnDestroy(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => true;
  }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;
    this.id = id;

  }

}
