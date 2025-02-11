import { Pipe, PipeTransform } from '@angular/core';
import { Params } from '@angular/router';

@Pipe({
  name: 'queryParams'
})
export class QueryParamsPipe implements PipeTransform {

  transform(page: string, value: any): Params {
    return { [page]: value };
  }

}
