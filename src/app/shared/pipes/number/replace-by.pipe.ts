import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceBy'
})
export class ReplaceBy implements PipeTransform {

  transform(value: string | null | undefined, replace: string = ',', to: string = '.'): string | undefined {
    return value?.replaceAll(replace, to);
  }

}
