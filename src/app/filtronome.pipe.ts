import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtronome'
})
export class FiltronomePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
