import { Component, Input, OnInit } from '@angular/core';
import { Provider } from '../../../../core/interfaces/providers.interface';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  @Input() provider!: Provider;

  constructor() { }

  ngOnInit(): void {
  }

}
