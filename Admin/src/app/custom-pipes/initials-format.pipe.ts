import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialsFormat'
})
export class InitialsFormatPipe implements PipeTransform {

  transform(value: string): string {
    // return null;
    let test = value.split(" ")
    let Initials = ''

    test.forEach((e:string) => {
      Initials += e.charAt(0)
    })

    return Initials
  }

}
