import { Pipe, PipeTransform } from '@angular/core';
import { getLicenseSideCode, formatLicensePlate } from '../../utils/licensePlate.util';

/**
 * @description
 * Format a string as a car license plate
 *
 * @export
 * @class LicensePlatePipe
 * @implements {PipeTransform}
 */
@Pipe({name: 'licensePlate', pure: true})
export class LicensePlatePipe implements PipeTransform {
  transform(input: string, length: number): string {
    return input ? formatLicensePlate(input, getLicenseSideCode(input)) : input;
  }
}
