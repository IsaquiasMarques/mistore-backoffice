import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceCommaByDot'
})
export class ReplaceCommaByDotPipe implements PipeTransform {

  transform(value: string | null | undefined): string | undefined {
    return value?.replaceAll(',', '.');
  }

}
