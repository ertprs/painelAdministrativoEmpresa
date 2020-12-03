import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtronomedinam'
})
export class FiltronomedinamPipe implements PipeTransform {

  transform(items: any[], filterBy: string): any {
    if (!filterBy || filterBy === '') { return items; }
    console.log('items');
    console.log(items);
    console.log('filterBy');
    console.log(':' + filterBy + ':');
    return items.filter(item => item.nome.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1);
}

}
