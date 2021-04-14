import { AfterViewInit, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Cast } from 'src/app/core/interfaces/credits.interface';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slide',
  templateUrl: './cast-slide.component.html',
  styleUrls: ['./cast-slide.component.css']
})
export class CastSlideComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[] = [];

  swiper!: Swiper;

  constructor() { }

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.swiper = new Swiper('.swiper-container', {
        slidesPerView: 2.7,
        freeMode: true,
        spaceBetween: 15
      });
    }, 100);

  }

  ngOnInit(): void {
  }

  onSlideNext(){
    this.swiper.slideNext();
  }

  onSlidePrev(){
    this.swiper.slidePrev();
  }


}
