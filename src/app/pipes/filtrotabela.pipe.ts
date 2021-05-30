import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrotabela'
})
export class FiltrotabelaPipe implements PipeTransform {

  transform(items: any, filterBy: string): any {
    if (!filterBy || filterBy === '') { return items; }
    return items.filteredData.filter(item => item.nome.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1);
}

}
