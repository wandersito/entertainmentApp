import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingModule } from 'ng-starrating';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { HomeComponent } from './pages/shared/home/home.component';
import { SlideImagePipe } from '../../shared/pipes/slide-image.pipe';
import { CardsComponent } from './components/cards/cards.component';
import { CardPipe } from '../../shared/pipes/card.pipe';
import { DetailMovie } from './pages/movies/detail/detail.movie';
import { ListMovie } from './pages/movies/list/list.movie';
import { DetailTvShow } from './pages/tv-shows/detail/detail.tv-show';
import { ListTvShow } from './pages/tv-shows/list/list.tv-show';
import { RoutePipe } from '../../shared/pipes/route.pipe';
import { CastSlideComponent } from './components/cast-slide/cast-slide.component';
import { DetailComponent } from './components/detail/detail.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    NavbarComponent, 
    SlideshowComponent, 
    HomeComponent,
    SlideImagePipe,
    CardPipe,
    RoutePipe,
    CardsComponent,
    DetailMovie,
    ListMovie,
    DetailTvShow,
    ListTvShow,
    CastSlideComponent,
    DetailComponent,

  ],
  imports: [
    CommonModule,
    RatingModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
