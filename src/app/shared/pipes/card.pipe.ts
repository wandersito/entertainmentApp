import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'card'
})
export class CardPipe implements PipeTransform {

  transform(posterUrl: string): string {
    if( posterUrl ){
      return `https://image.tmdb.org/t/p/w500${posterUrl}`;
    }
    return 'assets/no-image.jpg';
  }

}
