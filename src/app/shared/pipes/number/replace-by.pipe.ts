import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceBy'
})
export class ReplaceByPipe implements PipeTransform {

  transform(value: string | null | undefined, replace: string = ',', to: string = '.'): string | undefined {
    return value?.replaceAll(replace, to);
  }

}
