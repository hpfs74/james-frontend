import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description
 * Uppercase string
 *
 * @export
 * @class UppercasePipe
 * @implements {PipeTransform}
 */
@Pipe({name: 'uppercase'})
export class UppercasePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.toUpperCase() : value;
  }
}
