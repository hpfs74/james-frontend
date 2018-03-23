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
    const path = environment.james.langEndpoint + 'nl.json';
    this.http.request(path)
      .map(res => res.json())
      .toPromise()
      .then(data => {
        // TODO 'nl' should be extracted to a variable once we have multiple languages
        this.translateService.setTranslation('nl', data);
      })
      .catch(error => {
        // console.log('error', error);
      });
  }

  /**
   * always load the file from the app itself, prevent slow pending requests,
   * and failing requests
   */
  load(): Promise<any> {
    return this.getDefaultTags()
      .then(() => this.getTagsFromEndpoint())
      .catch(() => Promise.resolve());
  }

  getDefaultTags() {
    const path = '/content/tags.json';
    return this.tagsRequest(path);
  }

  getTagsFromEndpoint() {
    const path = environment.james.tagsEndpoint;
    return this.tagsRequest(path);
  }

  tagsRequest(path: string) {
    return this.http.request(path)
      .map(res => res.json())
      .toPromise()
      .then((data) => this.setTagsAndCopies(data))
      .catch(error => {
        return Promise.resolve();
      });
  }

  setTagsAndCopies(data: any) {
    this.tags = data;
    const translateKey = [];
    Object.keys(this.tags).forEach(key => {
      const section = this.tags[key];
      section.forEach(tag => translateKey.push(`${key}.${tag.tag}`));
    });

    this.translateService.get(translateKey)
      .subscribe(res => {
        this.copies = Object.assign({}, this.copies, res);
      });
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
  getAsLabelValue(key: string): Array<UIPair> {
    if (!this.tags) {
      return null;
    }


    const section = this.tags[key];
    return section.map(tag => {
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
  }

  sanitizeText(value: string) {
    const icon = '(ii)';
    return stripHTML(value).replace(icon, '').trim();
  }
}
