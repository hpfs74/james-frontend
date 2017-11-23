import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { stripHTML } from '../../utils/text.utils';
import { Tag } from '../models/tag';
import { UIPair } from '../models/ui-pair';

// TODO: coupled with middleware spec, should be refactored if using
// backend tags API directly
@Injectable()
export class TagsService {
  tags: { [key: string]: Array<Tag> };

  constructor(private http: Http) {}

  load(): Promise<any> {
    const path = '/content/tags.json';
    return this.http.request(path)
    .map(res => res.json())
    .toPromise()
    .then((data) => this.tags = data)
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

  /**
   * Transform a tag section to an label, value array for use
   * with form controls like a checkbox or select
   * @param key The section key, e.g. 'car_flow_km_per_year'
   */
  getAsLabelValue(key: string): Array<UIPair> {
    if (!this.tags) {
      return null;
    }

    const section = this.tags[key];
    return section.map(tag => {
      return {
        label: this.sanitizeText(tag.translation_text),
        value: tag.tag
      };
    });
  }

  sanitizeText(value: string) {
    const icon = '(ii)';
    return stripHTML(value).replace(icon, '').trim();
  }
}
