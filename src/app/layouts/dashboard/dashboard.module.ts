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


@NgModule({
  declarations: [
    DashboardComponent, 
    NavbarComponent, 
    SlideshowComponent, 
    HomeComponent,
    SlideImagePipe,
    CardPipe,
    CardsComponent,
  ],
  imports: [
    CommonModule,
    RatingModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
