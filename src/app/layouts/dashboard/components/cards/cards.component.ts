import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/core/interfaces/trending-response.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() weekTrending:Result[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
