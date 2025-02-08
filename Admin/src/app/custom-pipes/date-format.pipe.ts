import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    console.log(value,"----------------------------------------------")
    return value + "null";
  }

}
