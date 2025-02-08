import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr'; // Crores
    } else if (value >= 100000) {
      return (value / 100000).toFixed(1).replace(/\.0$/, '') + 'L'; // Lakhs
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k'; // Thousands
    } else {
      return value.toFixed(0).toString(); // Below thousand
    }
  }

  reverse(value: string): number {
    if (value.includes('k')) {
      return Number(value.replace("k","")) * 1000
    }else if (value.includes('L')) {
      return Number(value.replace("L","")) * 100000
    }else if (value.includes('Cr')) {
      return Number(value.replace("Cr","")) * 10000000
    }
    return 0
  }

}
