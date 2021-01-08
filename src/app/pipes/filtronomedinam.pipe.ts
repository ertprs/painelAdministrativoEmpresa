import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtronomedinam'
})
export class FiltronomedinamPipe implements PipeTransform {

  transform(items: any[], filterBy: {filtro: string, indexArray: string}): any {
    if (!filterBy.filtro || filterBy.filtro === '') { return items; }
    console.log(items);
    console.log(':' + filterBy + ':');
    try {
    return items.filter(item => item[filterBy.indexArray].toLowerCase().indexOf(filterBy.filtro.toLowerCase()) !== -1);
    } catch(e) {
      return items.filter(item => item[filterBy.indexArray].indexOf(filterBy.filtro) !== -1);
    }
}

}
