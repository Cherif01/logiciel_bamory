import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterModules'
})
export class FilterModulesPipe implements PipeTransform {
  transform(modules: any[], searchText: string): any[] {
    if (!modules) return [];
    if (!searchText) return modules;

    searchText = searchText.toLowerCase();

    return modules.filter(module =>
      module.title.toLowerCase().includes(searchText)
    );
  }
}
