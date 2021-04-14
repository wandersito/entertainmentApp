import { Pipe, PipeTransform } from '@angular/core';
import { MediaType } from '../../core/interfaces/trending-response.interface';

@Pipe({
  name: 'route'
})
export class RoutePipe implements PipeTransform {

  transform( mediaType: MediaType ): string {
    if( mediaType === MediaType.Movie ){
      return '/dashboard/movie';
    }
    return '/dashboard/tv-show';
  }

}
