import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'route'
})
export class RoutePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
