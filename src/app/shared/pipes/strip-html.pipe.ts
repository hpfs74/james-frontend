import { Pipe, PipeTransform } from '@angular/core';

/*
 * Remove html tags from a string.
 *
 * Usage:
 *   value | stripHtml
 * Example:
 *   {{ '<html><body>Test</body></html> | stripHtml }}
 *   will output: Test
*/
@Pipe({name: 'stripHtml'})
export class StripHtmlPipe implements PipeTransform {
  transform(value: string): string {

    return value.replace(/<\/?[^>]+(>|$)/g, '');
  }
}
