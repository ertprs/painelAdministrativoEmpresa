import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomes'
})
export class NomesPipe implements PipeTransform {

  transform(items: any[], filterBy: string): any {
    if (!filterBy || filterBy === '') { return items; }
    console.log('items');
    console.log(items);
    console.log('filterBy');
    console.log(':' + filterBy + ':');
    return items.filter(item => item.nome.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1);
}

}
