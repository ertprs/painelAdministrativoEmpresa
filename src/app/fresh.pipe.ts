import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fresh'
})
export class FreshPipe implements PipeTransform {

  transform(values: any, isName: any): any {
    console.log('#Pipe#');
    if (isName === '') {
      return values;
    }
    const lista: any[] = [];

    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < values.length; x++) {
      const teamName: string = values[x].texto;
      if (teamName.startsWith(isName)) {
        lista.push(values[x]);
        console.log('ok');
      }
    }

    return values.filter((item) => item.isFresh);
  }

}
