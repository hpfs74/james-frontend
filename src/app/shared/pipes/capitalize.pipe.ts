import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description
 * Capitalize string
 *
 * @export
 * @class CapitalizePipe
 * @implements {PipeTransform}
 */
@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.toLocaleLowerCase().charAt(0).toUpperCase() + value.toLowerCase().slice(1) : '';
  }
}
