import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/core/interfaces/trending-response.interface';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  @Input() dayTrending:Result[] = [];

  swiper!: Swiper;

  constructor() { }

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.swiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 2,
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
