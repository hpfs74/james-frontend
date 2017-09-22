import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'boolean' })
export class BooleanPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Ja' : 'Nee';
  }
}
