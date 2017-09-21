import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description
 * Round number
 *
 * @export
 * @class RoundPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value);
  }
}
