import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaType } from 'src/app/core/interfaces/trending-response.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.tv-show.html',
  styleUrls: ['./detail.tv-show.css']
})
export class DetailTvShow implements OnInit, OnDestroy {

  id!: string;
  mediaType: MediaType = MediaType.Tv;

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
