import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { stripHTML } from '@knx/utils';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Tag } from '../models/tag';
import { UIPair } from '../models/ui-pair';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';

// TODO: coupled with middleware spec, should be refactored if using
// backend tags API directly
@Injectable()
export class TagsService {
  tags: { [key: string]: Array<Tag> };
  copies: { [key: string]: string };

  constructor(private http: Http, private translateService: TranslateService) {
    this.translateService.use('nl');
  }


  load(): Promise<any> {
    const path = '/content/tags.json';
    return this.http.request(environment.james.tagsEndpoint)
      .map(res => res.json())
      .toPromise()
      .then((data) => this.tags = data)
      .then(() => {
        const translateKey = [];
        Object.keys(this.tags).forEach(key => {
          const section = this.tags[key];
          section.forEach(tag => translateKey.push(`${key}.${tag.tag}`));
        });

        this.translateService.get(translateKey)
          .subscribe(res => {
            this.copies = Object.assign({}, this.copies, res);
          });
      })
      .catch(error => Promise.resolve());
  }

  getByKey(key: string): Array<Tag> {
    return this.tags[key] || null;
  }

  /**
   * Return translation text for a given key and tag
   * @example
   * getTranslationText('car_flow_km_per_year', 'KMR1')
   * will return '7.500 of minder'
   * @param key The section key, e.g. 'car_flow_km_per_year'
   * @param tag The tag value, e.g. 'KMR1'
   */
  getTranslationText(key: string, tag: string): string {
    if (!this.tags) {
      return null;
    }

    const section = this.tags[key];
    if (!section) {
      return null;
    }

    const el = section.filter(el => el.tag === tag && !el.blocked)[0];
    if (el) {
      return this.sanitizeText(el.translation_text);
    }
    return null;
  }


  getTranslationDescription(key: string, tag: string): string {
    if (!this.tags) {
      return null;
    }

    const section = this.tags[key];
    if (!section) {
      return null;
    }

    const el = section.filter(el => el.tag === tag && !el.blocked)[0];
    if (el) {
      return this.sanitizeText(el.translation_description);
    }
    return null;
  }

  /**
   * Transform a tag section to an label, value array for use
   * with form controls like a checkbox or select
   * @param key The section key, e.g. 'car_flow_km_per_year'
   */
  getAsLabelValue(key: string, sortAlphabeticaly?: boolean): Array<UIPair> {
    if (!this.tags) {
      return null;
    }

    const section: any = this.tags[key];
    let mappedSection = section.map(tag => {
      const copyKey = `${key}.${tag.tag}`;
      let label = this.copies[copyKey];
      if ((!label && label.length === 0) || label === copyKey) {
        label = this.sanitizeText(tag.translation_text);
      }

      return {
        label: label,
        value: tag.tag,
        disabled: tag.disabled
      };
    });
    return sortAlphabeticaly ? mappedSection.sort((a, b) => {
      let letterA = a.label.toLowerCase(), letterB = b.label.toLowerCase();
      if ( letterA < letterB ) {
        return -1;
      }
      if ( letterA > letterB ) {
        return 1;
      }
      return 0;
     }) : mappedSection;
  }

  sanitizeText(value: string) {
    const icon = '(ii)';
    return stripHTML(value).replace(icon, '').trim();
  }
}
